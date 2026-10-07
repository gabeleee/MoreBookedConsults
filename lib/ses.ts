// lib/ses.ts
//
// Amazon SES v2 SendEmail over plain HTTPS with a hand-signed SigV4 request
// (no AWS SDK dependency). SERVER ONLY.
//
// Env: AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY, AWS_SES_REGION
// (default us-east-2), AWS_SES_CONFIGURATION_SET (default "sites" — routes
// bounces and complaints to the owner via SNS). The key belongs to the
// send-only IAM user, so it can do nothing but send.
//
// Not named AWS_ACCESS_KEY_ID on purpose: that name is picked up implicitly by
// any AWS tooling on the box, and this key should only ever be used here.

import { createHash, createHmac } from "node:crypto";

export function sesConfigured(): boolean {
  return Boolean(process.env.AWS_SES_ACCESS_KEY_ID && process.env.AWS_SES_SECRET_ACCESS_KEY);
}

const sha256 = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");
const hmac = (key: Buffer | string, s: string) => createHmac("sha256", key).update(s, "utf8").digest();

/** Send one email through SES. Throws on a non-2xx response. */
export async function sesSend(opts: {
  from: string;
  to: string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string[];
}): Promise<void> {
  const accessKey = process.env.AWS_SES_ACCESS_KEY_ID!;
  const secretKey = process.env.AWS_SES_SECRET_ACCESS_KEY!;
  const region = process.env.AWS_SES_REGION || "us-east-2";
  const configSet = process.env.AWS_SES_CONFIGURATION_SET ?? "sites";

  const host = `email.${region}.amazonaws.com`;
  const path = "/v2/email/outbound-emails";
  const body = JSON.stringify({
    FromEmailAddress: opts.from,
    Destination: { ToAddresses: opts.to },
    ...(opts.replyTo?.length ? { ReplyToAddresses: opts.replyTo } : {}),
    Content: {
      Simple: {
        Subject: { Data: opts.subject, Charset: "UTF-8" },
        Body: {
          ...(opts.html != null ? { Html: { Data: opts.html, Charset: "UTF-8" } } : {}),
          ...(opts.text != null ? { Text: { Data: opts.text, Charset: "UTF-8" } } : {}),
        },
      },
    },
    ...(configSet ? { ConfigurationSetName: configSet } : {}),
  });

  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ
  const day = amzDate.slice(0, 8);
  const payloadHash = sha256(body);
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = [
    "POST",
    path,
    "",
    `content-type:application/json\nhost:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const scope = `${day}/${region}/ses/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, sha256(canonicalRequest)].join("\n");
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${secretKey}`, day), region), "ses"), "aws4_request");
  const signature = createHmac("sha256", signingKey).update(stringToSign, "utf8").digest("hex");

  const res = await fetch(`https://${host}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Amz-Content-Sha256": payloadHash,
      "X-Amz-Date": amzDate,
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
    body,
  });
  if (!res.ok) throw new Error(`SES ${res.status}: ${await res.text()}`);
}

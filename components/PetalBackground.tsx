// Per-section petal decoration, ported from the mockup's `.petals` blocks.
// Two layers: small drifting petals (pure-CSS `drift` animation) and
// oversized parallax trios (CSS `sway` on the SVG + scroll parallax applied
// by <PetalParallax /> to the wrapper div). Pure markup, no JS here.
import type { CSSProperties } from "react";

type Placement = Pick<CSSProperties, "top" | "left" | "right" | "bottom">;

export type SmallPetal = Placement & {
  r?: string; // rotation seed for the drift animation (--r)
  size: number; // width/height in px
  fill: string;
};

export type ParallaxTrio = Placement & {
  speed: number; // scroll parallax factor (data-speed)
  dur?: string; // sway duration (--dur)
  del?: string; // sway delay (--del)
  size: number; // svg width/height in px
  opacity?: number;
};

type Props = {
  petals?: SmallPetal[];
  trios?: ParallaxTrio[];
};

export default function PetalBackground({ petals = [], trios = [] }: Props) {
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => {
        const { r, size, fill, ...pos } = p;
        const style = { ...pos, "--r": r ?? "0deg" } as CSSProperties;
        return (
          <svg
            key={i}
            className="petal"
            style={style}
            width={size}
            height={size}
            viewBox="-50 -50 100 100"
          >
            <use href="#petalShape" fill={fill} />
          </svg>
        );
      })}
      {trios.map((t, i) => {
        const { speed, dur, del, size, opacity, ...pos } = t;
        const bigStyle = {
          "--dur": dur ?? "18s",
          "--del": del ?? "0s",
          ...(opacity != null ? { opacity } : {}),
        } as CSSProperties;
        return (
          <div
            key={i}
            className="petal-parallax"
            data-speed={speed}
            style={pos as CSSProperties}
          >
            <svg
              className="petal-big"
              style={bigStyle}
              viewBox="0 0 96 96"
              width={size}
              height={size}
              aria-hidden="true"
            >
              <use href="#petalTrio" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

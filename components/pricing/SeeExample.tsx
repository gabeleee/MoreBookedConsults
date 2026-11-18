"use client";
import { useRef, type ReactNode } from "react";

// Thumbnail of a system's art + "See example" button that opens it full size
// (same idea as the proposals' "See it" popups).
export default function SeeExample({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => ref.current?.showModal();
  return (
    <>
      <button type="button" className="pv-thumb" onClick={open} aria-label={`See an example of ${name}`}>
        <span className="pv-thumb-in">{children}</span>
      </button>
      <button type="button" className="pv-see" onClick={open}>
        See example <span aria-hidden="true">→</span>
      </button>
      <dialog
        ref={ref}
        className="pv-dlg"
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
      >
        <div className="pv-dlg-in">
          <button type="button" className="pv-dlg-x" onClick={() => ref.current?.close()} aria-label="Close">
            ×
          </button>
          <p className="pv-dlg-name">
            {name}
            <sup>™</sup>
          </p>
          <div className="pv-dlg-art">{children}</div>
          <p className="pv-dlg-note">{note}</p>
        </div>
      </dialog>
    </>
  );
}

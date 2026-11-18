"use client";
import { useRef, type ReactNode } from "react";

// Thumbnail of a system's art + "See example" button that opens it full size
// (same idea as the proposals' "See it" popups).
export default function SeeExample({ name, note, children, thumb = true, label = "See example", inline = false }: { name: string; note: string; children: ReactNode; thumb?: boolean; label?: string; inline?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => ref.current?.showModal();
  return (
    <>
      {thumb && (
        <button type="button" className="pv-thumb" onClick={open} aria-label={`See an example of ${name}`}>
          <span className="pv-thumb-in">{children}</span>
        </button>
      )}
      {inline ? (
        <button type="button" className="pv-see-inline" onClick={open}>
          (<span>{label}</span>)
        </button>
      ) : (
        <button type="button" className="pv-see" onClick={open}>
          {label} <span aria-hidden="true">→</span>
        </button>
      )}
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
            {(thumb || inline) && <sup>™</sup>}
          </p>
          <div className="pv-dlg-art">{children}</div>
          <p className="pv-dlg-note">{note}</p>
        </div>
      </dialog>
    </>
  );
}

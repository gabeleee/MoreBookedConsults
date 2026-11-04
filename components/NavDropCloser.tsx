"use client";
// The mega menus open on CSS :hover and :focus-within. After a click on a menu
// link, Next swaps the page without remounting the header, so the clicked link
// keeps focus and the pointer is still over the menu: both keep it open. On
// every route change this blurs the focused link and marks any menu that is
// still open "mega-off" (CSS hides it) until the pointer leaves it.
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavDropCloser() {
  const pathname = usePathname();

  useEffect(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.closest(".nav-drop")) active.blur();

    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>(".nav-drop").forEach((drop) => {
      if (!drop.matches(":hover")) return;
      drop.classList.add("mega-off");
      const reopen = () => drop.classList.remove("mega-off");
      drop.addEventListener("mouseleave", reopen, { once: true });
      cleanups.push(() => drop.removeEventListener("mouseleave", reopen));
    });
    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}

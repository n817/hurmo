import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Browsers only auto-scroll to `#anchor` on a full page load, so client-side
 * navigation has to do it by hand: jump to the anchor when there is one,
 * otherwise start a freshly opened page at the top.
 */
export function ScrollToHash() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: "smooth" });
  }, [hash, key]);

  return null;
}

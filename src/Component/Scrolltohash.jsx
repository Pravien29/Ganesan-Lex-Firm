import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to the #section in the URL after navigating, or to the top if there is none.
// React Router does not do this on its own.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;

    // The new page may still be rendering, so retry for up to ~2 seconds
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        clearInterval(timer);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (++tries > 20) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
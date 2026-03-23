import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const fromBottom = fullHeight - (scrollTop + windowHeight);

      if (scrollTop > 800 ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Some pages may have nested scrollable containers (e.g. tab/review sections).
    // Reset them too so the page does not look "stuck" after returning top.
    const nestedScrollables = document.querySelectorAll<HTMLElement>(
      ".watch-detail-page, .watch-tabs-section, .tab-content, .reviews-content, .reviews-list"
    );
    nestedScrollables.forEach((el) => {
      el.scrollTop = 0;
    });
  };

  return showButton ? (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "10px",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Scroll to top"
    >
      <img src="/img/logo/top.png" alt="Top" style={{ width: 60, height: 60, objectFit: "contain" }} />
    </button>
  ) : null;
};

export default ScrollToTop;

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
      <img src="/img/logo/top.png" alt="Top" style={{ width: 80, height: 80, objectFit: "contain" }} />
    </button>
  ) : null;
};

export default ScrollToTop;

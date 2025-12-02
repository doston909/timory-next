import { useEffect, useState } from "react";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

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
        bottom: "30px",
        right: "30px",
        padding: "20px",
        
        border: "none",
        backgroundColor: "#E5C8A3",
        color: "#000",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        cursor: "pointer",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Scroll to top"
    >
      <WatchLaterOutlinedIcon fontSize="large" />
    </button>
  ) : null;
};

export default ScrollToTop;

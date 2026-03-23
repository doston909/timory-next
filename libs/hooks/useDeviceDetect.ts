import { useEffect, useState } from "react";

/** Matches SCSS breakpoint for #pc-wrap mobile navbar (main.scss max-width: 768px) */
const MOBILE_LAYOUT_MAX_WIDTH = 768;

const useDeviceDetect = (): string => {
  const [device, setDevice] = useState<string>("desktop");

  useEffect(() => {
    const resolveDevice = () => {
      const ua = navigator.userAgent;
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          ua
        );
      const isNarrowViewport = window.innerWidth <= MOBILE_LAYOUT_MAX_WIDTH;
      // Viewport + UA: hamburger & mobile chrome show in devtools responsive mode too
      setDevice(isMobileUA || isNarrowViewport ? "mobile" : "desktop");
    };

    resolveDevice();
    window.addEventListener("resize", resolveDevice);
    return () => window.removeEventListener("resize", resolveDevice);
  }, []);

  return device;
};

export default useDeviceDetect;
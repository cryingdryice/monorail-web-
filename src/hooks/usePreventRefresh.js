import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePreventRefresh(surrender) {
  const location = useLocation();

  useEffect(() => {
    const preventRefresh = (event) => {
      if (location.pathname.includes("/game")) { // ✅ 특정 페이지에서만 차단
        surrender();
      }
    };

    const preventKeyDown = (event) => {
      if (location.pathname.includes) { // ✅ 특정 페이지에서만 차단
        if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
          surrender();
        }
      }
    };

    window.addEventListener("beforeunload", preventRefresh);
    window.addEventListener("keydown", preventKeyDown);

    return () => {
      window.removeEventListener("beforeunload", preventRefresh);
      window.removeEventListener("keydown", preventKeyDown);
    };
  }, [location.pathname]);
}

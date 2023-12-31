import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/AppProvider";
import { OCC, OCO, OOO } from "../column/columnPattern";
import { maxWidth, minWidth } from "../context/initialState";
import { isMobile } from "react-device-detect";

type Props = {};

const useAssignColumn = () => {
  console.log("triggered");
  const { assignColumn, getWindow } = useGlobalContext();
  // if (typeof window === "undefined" && typeof window !== "object") return;
  const [windowRealTime, setwindowRealTime] = useState(0);
  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize

    function handleResize() {
      if (isMobile) return;
      if (typeof window === "undefined" && typeof window !== "object") return;
      // Set window width/height to state
      const windowWidth = window!.innerWidth!;

      getWindow(windowWidth);

      if (windowWidth < minWidth) {
        assignColumn(OCC);
      } else if (windowWidth >= minWidth && windowWidth <= maxWidth) {
        assignColumn(OCO);
      } else {
        assignColumn(OOO);
      }
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount
  return "nama";
};

export default useAssignColumn;

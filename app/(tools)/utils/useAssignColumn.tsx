import { useEffect } from "react";
import { useGlobalContext } from "../context/AppProvider";
import { OCC, OCO, OOO } from "../column/columnPattern";
import { maxWidth, minWidth } from "../context/initialState";

type Props = {};

const useAssignColumn = () => {
  if (typeof window !== "object" || typeof window === "undefined")
    return "noClue";
  else {
    const {
      assignColumn,
      getWindow,
      state: { currentWindow },
    } = useGlobalContext();
    // if (typeof window === "undefined" && typeof window !== "object") return;
    const windowWidth = window!.innerWidth!;
    if (currentWindow === windowWidth) return;
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize

      const handleResize = () => {
        if (typeof window !== "object" || typeof window === "undefined") {
          return;
        }
        // Set window width/height to state

        getWindow(windowWidth);

        if (windowWidth < minWidth) {
          assignColumn(OCC);
        } else if (windowWidth >= minWidth && windowWidth <= maxWidth) {
          assignColumn(OCO);
        } else {
          assignColumn(OOO);
        }
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
      // eslint-disable-next-line
    }, [window]); // Empty array ensures that effect is only run on mount
  }
  return "nama";
};

export default useAssignColumn;

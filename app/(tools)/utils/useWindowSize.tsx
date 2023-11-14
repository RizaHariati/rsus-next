import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/AppProvider";
import { OCC } from "../column/columnPattern";

type Props = {};

const useWindowSize = () => {
  const {
    assignColumn,
    state: { columnAssignment },
  } = useGlobalContext();
  // if (!window || typeof window !== "object") return;
  const [windowSize, setWindowSize] = useState({
    width: window?.innerWidth! || 0,
    height: window?.innerHeight! || 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize

    function handleResize() {
      if (!window || typeof window !== "object") return;
      // Set window width/height to state
      const windowWidth = window!.innerWidth!;
      if (windowWidth < 600) {
        assignColumn({ ...OCC });
      }
      setWindowSize({
        width: windowWidth,
        height: window!.innerHeight!,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export default useWindowSize;

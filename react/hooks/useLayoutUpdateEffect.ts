import React from "react";

/**
 * Update Life Circle
 */
const useLayoutUpdateEffect: typeof React.useEffect = (callback, deps) => {
  const firstMountRef = React.useRef(true);

  React.useLayoutEffect(() => {
    if (!firstMountRef.current) {
      callback();
    }
  }, deps);

  React.useLayoutEffect(() => {
    firstMountRef.current = false;

    return () => (firstMountRef.current = true);
  });
};

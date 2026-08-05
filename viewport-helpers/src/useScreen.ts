import { useCallback, useEffect, useRef, useState } from "react";

/** Current browser viewport dimensions. */
interface WindowSize {
  /** Viewport width in CSS pixels. */
  width: number;
  /** Viewport height in CSS pixels. */
  height: number;
}

/**
 * Returns the current viewport size and controls its resize subscription.
 */
export const useScreen = () => {
  /** Current viewport state, undefined during server rendering. */
  const [windowSize, setWindowSize] = useState<WindowSize>();
  /** Prevents duplicate resize listeners when callers manually subscribe. */
  const isSubscribed = useRef(false);

  /**
   * Reads the current viewport dimensions after a resize event.
   */
  const onResizeHandler = useCallback(() => {
    if (typeof window === "undefined") return;

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  /**
   * Subscribes to viewport changes once.
   */
  const subscribe = useCallback(() => {
    if (typeof window === "undefined" || isSubscribed.current) return;

    window.addEventListener("resize", onResizeHandler);
    isSubscribed.current = true;
  }, [onResizeHandler]);

  /**
   * Removes the viewport listener when it is active.
   */
  const unsubscribe = useCallback(() => {
    if (typeof window === "undefined" || !isSubscribed.current) return;

    window.removeEventListener("resize", onResizeHandler);
    isSubscribed.current = false;
  }, [onResizeHandler]);

  useEffect(
    function useScreenEffect() {
      // Effects do not run during SSR; this guard also protects direct test environments.
      if (typeof window === "undefined") return undefined;

      onResizeHandler();
      subscribe();

      return unsubscribe;
    },
    [onResizeHandler, subscribe, unsubscribe]
  );

  return {
    windowSize,
    subscribe,
    unsubscribe,
  };
};

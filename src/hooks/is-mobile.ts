"use client";

import { useEffect, useState } from "react";

export function useMobile() {
  const targetBreakpoint = "(max-width: 678px)";
  const mediaQuery = window.matchMedia(targetBreakpoint);
  const [isMobile, setIsMobile] = useState(mediaQuery.matches);

  function updateScreenSize() {
    setIsMobile(mediaQuery.matches);
  }

  useEffect(() => {
    mediaQuery.addEventListener("change", updateScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", updateScreenSize);
    };
  });

  return { isMobile };
}

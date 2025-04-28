"use client";

import "client-only";
import { ReactNode, useEffect, useState } from "react";

export default function NoSSR({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!shouldRender) {
      setShouldRender(true);
    }
  }, [shouldRender]);

  return shouldRender ? <>{children}</> : null;
}

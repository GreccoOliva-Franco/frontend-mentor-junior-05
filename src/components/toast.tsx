import React from "react";

export default function ToastContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

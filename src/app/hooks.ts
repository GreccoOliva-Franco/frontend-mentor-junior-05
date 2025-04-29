"use client";

import { useReducer } from "react";

type Action = "update";

export function useField<T>({
  value,
  message = "",
}: {
  value: T;
  message: string;
}) {
  const [state, dispatch] = useReducer(
    (prevState, { action, data }: { action: Action; data: T }) => {
      switch (action) {
        case "update": {
          return { ...prevState, value: data };
        }
      }
    },
    {
      value,
      error: false,
      message,
    }
  );

  return {
    ...state,
    update: (data: T) => {
      dispatch({ action: "update", data });
    },
  };
}

import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ErrorComponent({ message }: {message: string}) {
  const { theme } = useTheme();

  return (
    <div
      className="
        max-w-4xl mx-auto p-4 rounded-md
        bg-red-500/10 text-red-700
        border border-red-600
        flex items-center gap-2"
    >
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

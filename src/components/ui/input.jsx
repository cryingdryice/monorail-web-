import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

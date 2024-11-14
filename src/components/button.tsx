import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  pending?: boolean;
}

export function Button(
  { children, pending = false, ...restProps }: ButtonProps) {
  return (
    <button
      className="px-4 py-1 text-white rounded bg-green-500 disabled:bg-gray-400"
      disabled={pending}
      {...restProps}
    >
      {children}
    </button>
  );
}
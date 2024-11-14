"use client";

import { useFormStatus } from "react-dom";

export function ButtonFormStatus({
  className,
  children,
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={className} {...restProps}>
      {children}
    </button>
  );
}

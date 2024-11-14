"use client"

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function ButtonFormStatus(
  { children }: { children: React.ReactNode }
) {
  const { pending, data } = useFormStatus();

  return (
    <Button pending={pending}>
      {pending ? `Saving ${data.get("title")}...` : children}
    </Button>
  );
} 
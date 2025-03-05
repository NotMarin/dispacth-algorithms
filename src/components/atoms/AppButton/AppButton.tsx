import { cn } from "@/utils/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export function AppButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-primary-600 dark:text-primary-950 flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-white focus:outline-none dark:bg-white",
        className
      )}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  );
}

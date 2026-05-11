import { cn } from "@/shared/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        variant === "secondary" && "bg-surface-container text-foreground hover:bg-surface-container/80",
        variant === "ghost" && "text-foreground hover:bg-surface-container",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

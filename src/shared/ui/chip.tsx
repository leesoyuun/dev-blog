import { cn } from "@/shared/utils/cn";

type Props = {
  label: string;
  active?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Chip({ label, active = false, className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-surface-container text-muted-foreground hover:bg-surface-container/80",
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
}

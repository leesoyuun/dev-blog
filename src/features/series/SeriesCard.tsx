import Link from "next/link";
import { Chip } from "@/shared/ui/chip";
import { cn } from "@/shared/utils/cn";

type Series = {
  slug: string;
  title: string;
  description: string;
  count: number;
};

type Props = {
  series: Series;
  className?: string;
};

export function SeriesCard({ series, className }: Props) {
  return (
    <Link
      href={`/series/${series.slug}`}
      className={cn(
        "group flex flex-col rounded-lg bg-surface-container p-6 transition-shadow hover:shadow-lg",
        className
      )}
    >
      <h3 className="mb-2 text-xl font-bold leading-[1.2] text-foreground transition-colors group-hover:text-primary">
        {series.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{series.description}</p>
      <Chip label={`${series.count}편`} active className="self-start" />
    </Link>
  );
}

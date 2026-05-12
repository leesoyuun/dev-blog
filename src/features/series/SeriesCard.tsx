import Link from "next/link";
import { Chip } from "@/shared/ui/chip";
import { cn } from "@/shared/utils/cn";

type Series = {
  slug: string;
  title: string;
  description: string;
  count: number;
  tags: readonly string[];
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
      <div className="mb-3 flex flex-wrap gap-2">
        {series.tags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </div>
      <h3 className="mb-2 text-xl font-bold leading-[1.2] text-foreground transition-colors group-hover:text-primary">
        {series.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{series.description}</p>
      <span className="text-sm font-semibold text-primary">{series.count}편</span>
    </Link>
  );
}

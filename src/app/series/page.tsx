import type { Metadata } from "next";
import { SeriesCard } from "@/features/series/SeriesCard";
import { SERIES } from "@/features/series/data";

export const metadata: Metadata = {
  title: "시리즈",
  description: "주제별로 묶은 연재 시리즈 모음",
};

export default function SeriesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:py-16">
      <header className="mb-12">
        <h1 className="mb-3 text-4xl font-black leading-[1.1] lg:text-5xl">
          시리즈
        </h1>
        <p className="text-muted-foreground">{SERIES.length}개의 시리즈</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERIES.map((series) => (
          <SeriesCard key={series.slug} series={series} />
        ))}
      </div>
    </div>
  );
}

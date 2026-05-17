export type SeriesPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  order: number;
};

export type Series = {
  slug: string;
  title: string;
  description: string;
  count: number;
  tags: string[];
  posts: SeriesPost[];
};

export const SERIES: Series[] = [];

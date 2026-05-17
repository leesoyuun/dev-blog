"use client";

import { useSyncExternalStore } from "react";

function getOrCreateId(): string {
  const stored = localStorage.getItem("reader-id");
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem("reader-id", id);
  return id;
}

const subscribe = () => () => {};

export function useReaderId(): string | null {
  return useSyncExternalStore(subscribe, getOrCreateId, () => null);
}

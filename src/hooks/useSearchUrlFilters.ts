/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { isClient } from "@/utils/isClient";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type UrlFilters = {
  searchTerm: string;
  page: number;
  limit: number;
  category: string;
  level: string;
  sort: string;
} & Record<string, any>;

/** Multi-select filters stored as CSV in the URL. */
export type ArrayFilterKey = "levels" | "languages";

const DEFAULTS: UrlFilters = {
  searchTerm: "",
  page: 1,
  limit: 12,
  category: "",
  level: "",
  sort: "",
};

// ---- Helpers
// function splitByComma(v: string | null): string[] {
//   if (!v) return [];
//   return v
//     .split(",")
//     .map((s) => s.trim())
//     .filter(Boolean);
// }

function joinByComma(arr: string[] | undefined): string | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr.join(",");
}

function toInt(v: string | null, fallback: number): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function useSearchUrlFilters() {
  const searchParams = useSearchParams();

  // Parse values from search URL
  const filters: UrlFilters = useMemo(() => {
    const searchTerm = searchParams.get("searchTerm") || DEFAULTS.searchTerm;

    // Pagination queries
    const page = toInt(searchParams.get("page"), DEFAULTS.page);
    const limit = toInt(searchParams.get("limit"), DEFAULTS.limit);

    const category = searchParams.get("category") || DEFAULTS.category;
    const level = searchParams.get("level") || DEFAULTS.level;
    const sort = searchParams.get("sort") || DEFAULTS.sort;

    return {
      searchTerm,
      page,
      limit,
      category,
      level,
      sort,
    };
  }, [searchParams]);

  // Replace url params - using router.replace so that if user
  // clicks back button it won't send back to previous queries instead,
  // to previous page they came from
  const replaceParams = useCallback(
    (patch: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v === undefined || v === "") next.delete(k);
        else next.set(k, v);
      });

      if (isClient()) {
        window?.history?.replaceState(null, "", `?${next.toString()}`);
      }
    },
    [searchParams]
  );

  // Convenience: apply patch + reset page in ONE replace
  const replaceParamsWithResetPage = useCallback(
    (patch: Record<string, string | undefined>) => {
      replaceParams({ ...patch, page: "1" });
    },
    [replaceParams]
  );

  // Method to set filters to url params
  const setFilter = useCallback(
    (
      key: keyof UrlFilters,
      value: string | number | null | string[],
      opts?: { resetPage?: boolean }
    ) => {
      const patch: Record<string, string | undefined> = {};

      switch (key) {
        case "page":
        case "limit":
          patch[key] = String(value);
          break;
        default:
          patch[key] = (value as string) || undefined;
      }

      // Reset page to 1 if found in options
      if (opts?.resetPage) replaceParamsWithResetPage(patch);
      else replaceParams(patch);
    },
    [replaceParams, replaceParamsWithResetPage]
  );

  const setMultipleFilters = useCallback(
    (patchObj: Partial<UrlFilters>, opts?: { resetPage?: boolean }) => {
      const patch: Record<string, string | undefined> = {};

      for (const [k, v] of Object.entries(patchObj)) {
        if (v === null || v === undefined) {
          patch[k] = undefined; // delete
        } else if (Array.isArray(v)) {
          patch[k] = v.join(","); // CSV in URL
        } else if (typeof v === "number") {
          patch[k] = String(v);
        } else {
          patch[k] = v as string;
        }
      }

      if (opts?.resetPage) {
        replaceParamsWithResetPage(patch);
      } else {
        replaceParams(patch);
      }
    },
    [replaceParams, replaceParamsWithResetPage]
  );

  // Method to toggle multi-select filter items
  const toggleFilterItem = useCallback(
    (key: ArrayFilterKey, item: string) => {
      const current = (filters[key] as string[]) || [];
      const next = current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item];

      replaceParamsWithResetPage({ [key]: joinByComma(next) });
    },
    [filters, replaceParamsWithResetPage]
  );

  // Method to reset/clear filters
  const resetFilters = useCallback(() => {
    const sp = new URLSearchParams();

    sp.set("limit", String(DEFAULTS.limit));
    sp.set("page", String(DEFAULTS.page));

    if (isClient()) {
      window?.history?.replaceState(null, "", `?${sp.toString()}`);
    }
  }, []);

  return {
    filters,
    setFilter,
    setMultipleFilters,
    toggleFilterItem,
    resetFilters,
  } as const;
}

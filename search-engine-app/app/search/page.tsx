import { Suspense } from "react";
import { performSearch, SearchType } from "@/lib/search";
import SearchClient from "./SearchClient";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const type = (params.type as SearchType) || "web";

  let results = null;
  let error = null;

  if (query) {
    try {
      results = await performSearch(query, type);
    } catch (e: unknown) {
      error = e instanceof Error ? e.message : "Failed to fetch search results";
    }
  }

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground animate-pulse">Searching the web...</div>}>
      <SearchClient
        initialQuery={query}
        initialResults={results}
        initialType={type}
        error={error}
      />
    </Suspense>
  );
}

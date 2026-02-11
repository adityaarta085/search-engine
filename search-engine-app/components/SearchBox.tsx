"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  className?: string;
  initialValue?: string;
  size?: "sm" | "md" | "lg";
}

export function SearchBox({ className, initialValue = "", size = "md" }: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== query) {
      setQuery(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "relative flex items-center w-full max-w-2xl transition-all duration-200",
        isFocused ? "scale-[1.01]" : "scale-100",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center w-full bg-card border rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden",
          isFocused ? "border-accent ring-2 ring-accent/20" : "border-border",
          size === "sm" ? "h-10" : size === "md" ? "h-12" : "h-14"
        )}
      >
        <div className="pl-4 text-muted-foreground">
          <Search className={cn(size === "sm" ? "w-4 h-4" : "w-5 h-5")} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search with AI intelligence..."
          className="flex-1 bg-transparent border-none outline-none px-3 text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="p-2 mr-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className={cn(
            "h-full px-6 bg-accent text-accent-foreground font-medium transition-colors hover:bg-accent/90",
            size === "sm" ? "text-sm" : "text-base"
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
}

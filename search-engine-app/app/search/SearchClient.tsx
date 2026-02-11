"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { SearchResultItem } from "@/components/SearchResultItem";
import { AISummaryPanel } from "@/components/AISummaryPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsMenu } from "@/components/SettingsMenu";
import { Sparkles, Globe, Image as ImageIcon, Video, Newspaper, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchClientProps {
  initialQuery: string;
  initialResults: any;
  initialType: "web" | "image" | "video" | "news";
  error: string | null;
}

export default function SearchClient({ initialQuery, initialResults, initialType, error }: SearchClientProps) {
  const [showAI, setShowAI] = useState(true);
  const [density, setDensity] = useState<"compact" | "normal" | "relaxed">("normal");

  useEffect(() => {
    const checkPreferences = () => {
      const savedAI = localStorage.getItem("search-show-ai");
      const savedDensity = localStorage.getItem("search-density");
      if (savedAI !== null) setShowAI(savedAI === "true");
      if (savedDensity !== null) setDensity(savedDensity as "compact" | "normal" | "relaxed");
    };

    checkPreferences();
    window.addEventListener("storage-update", checkPreferences);
    return () => window.removeEventListener("storage-update", checkPreferences);
  }, []);

  const tabs = [
    { id: "web", label: "All", icon: Globe },
    { id: "image", label: "Images", icon: ImageIcon },
    { id: "video", label: "Videos", icon: Video },
    { id: "news", label: "News", icon: Newspaper },
  ];

  const results = initialType === 'web' ? initialResults?.web?.results : initialResults?.results;
  const summarizerKey = initialResults?.summarizer?.key || null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex flex-col md:flex-row items-center gap-4 px-4 py-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center space-x-2 text-accent">
            <Sparkles className="w-6 h-6 fill-accent/10" />
            <span className="text-xl font-bold hidden md:inline">AI Search</span>
          </Link>

          <div className="flex-1 w-full max-w-2xl">
            <SearchBox size="sm" initialValue={initialQuery} />
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <SettingsMenu />
            <ThemeToggle />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 max-w-7xl mx-auto w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-6">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`/search?q=${encodeURIComponent(initialQuery)}&type=${tab.id}`}
                className={cn(
                  "flex items-center space-x-2 py-3 border-b-2 transition-colors text-sm font-medium",
                  initialType === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Results Column */}
          <div className="lg:col-span-8 space-y-6">
            {error ? (
              <div className="flex items-center space-x-2 p-4 bg-destructive/10 text-destructive rounded-xl">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            ) : results && results.length > 0 ? (
              <div className={cn(
                "space-y-0",
                density === "compact" ? "gap-2" : density === "relaxed" ? "gap-8" : "gap-4"
              )}>
                {results.map((result: any, idx: number) => (
                  <SearchResultItem key={result.url || idx} result={result} index={idx} />
                ))}
              </div>
            ) : initialQuery ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No results found for your query.</p>
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">Start searching the web with Brave privacy-first index.</p>
              </div>
            )}
          </div>

          {/* AI Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {showAI && initialQuery && summarizerKey && (
              <AISummaryPanel summarizerKey={summarizerKey} />
            )}

            <div className="bg-card border border-border rounded-xl p-6 hidden lg:block">
              <h3 className="text-sm font-semibold mb-4">Search Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span>Powered by Brave Search API</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span>Privacy-first, independent search results</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span>AI summaries provided by Brave Summarizer</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 px-4">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 AI Search Engine. Powered by Brave.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

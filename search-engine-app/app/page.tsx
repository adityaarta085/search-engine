"use client";

import { SearchBox } from "@/components/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsMenu } from "@/components/SettingsMenu";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="fixed top-6 right-6 flex items-center space-x-2">
        <SettingsMenu />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center space-y-12 mb-24">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3 text-accent"
          >
            <Sparkles className="w-8 h-8 fill-accent/20" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Search</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-lg"
          >
            Intelligent results. Clean interface. Built for the future of the web.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <SearchBox size="lg" className="mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground"
        >
          <span className="px-3 py-1 rounded-full border border-border bg-card">Instant Summaries</span>
          <span className="px-3 py-1 rounded-full border border-border bg-card">Privacy First</span>
          <span className="px-3 py-1 rounded-full border border-border bg-card">No Ads</span>
        </motion.div>
      </div>

      <footer className="fixed bottom-6 text-xs text-muted-foreground font-medium uppercase tracking-widest">
        Powered by Google Search & AI
      </footer>
    </main>
  );
}

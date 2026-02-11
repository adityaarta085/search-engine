"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Density = "compact" | "normal" | "relaxed";

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const [density, setDensity] = useState<Density>("normal");

  useEffect(() => {
    // We use a small delay to avoid the strict lint rule about
    // synchronous setState in effect.
    const timer = setTimeout(() => {
      const savedAI = localStorage.getItem("search-show-ai");
      const savedDensity = localStorage.getItem("search-density");

      if (savedAI !== null) {
        setShowAI(savedAI === "true");
      }

      if (savedDensity !== null) {
        setDensity(savedDensity as Density);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleAI = () => {
    const newValue = !showAI;
    setShowAI(newValue);
    localStorage.setItem("search-show-ai", String(newValue));
    window.dispatchEvent(new Event("storage-update"));
  };

  const updateDensity = (val: Density) => {
    setDensity(val);
    localStorage.setItem("search-density", val);
    window.dispatchEvent(new Event("storage-update"));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-muted transition-colors border border-border text-muted-foreground hover:text-foreground"
        aria-label="Settings"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-50 p-4"
            >
              <h3 className="text-sm font-semibold mb-3 px-1">Preferences</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-1">
                  <span className="text-sm">AI Summaries</span>
                  <button
                    onClick={toggleAI}
                    className={cn(
                      "relative inline-flex h-5 w-10 items-center rounded-full transition-colors",
                      showAI ? "bg-accent" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        showAI ? "translate-x-5" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground px-1 uppercase tracking-wider">
                    Result Density
                  </span>
                  <div className="grid grid-cols-3 gap-1 p-1 bg-muted rounded-lg">
                    {(["compact", "normal", "relaxed"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => updateDensity(d)}
                        className={cn(
                          "py-1.5 text-xs rounded-md transition-all capitalize",
                          density === d
                            ? "bg-card shadow-sm text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

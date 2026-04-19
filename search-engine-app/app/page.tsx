"use client";

import { SearchBox } from "@/components/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SettingsMenu } from "@/components/SettingsMenu";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      <BackgroundVideo />

      <div className="fixed top-6 right-6 flex items-center space-x-2 z-10">
        <SettingsMenu />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center space-y-12 mb-24 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-3 text-accent"
          >
            <Sparkles className="w-10 h-10 fill-accent/20" />
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl text-foreground">
              Desa Ngawonggo
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-accent drop-shadow-lg max-w-2xl"
          >
            Mewujudkan Desa Ngawonggo yang Mandiri & Digital
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-lg font-medium"
          >
            Portal informasi dan pelayanan digital terintegrasi untuk masyarakat Desa Ngawonggo.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full"
        >
          <SearchBox size="lg" className="mx-auto shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 text-sm font-semibold"
        >
          <span className="px-4 py-2 rounded-full border border-white/10 bg-card/50 backdrop-blur-sm shadow-sm">Pelayanan Digital</span>
          <span className="px-4 py-2 rounded-full border border-white/10 bg-card/50 backdrop-blur-sm shadow-sm">Transparansi Desa</span>
          <span className="px-4 py-2 rounded-full border border-white/10 bg-card/50 backdrop-blur-sm shadow-sm">Kemandirian Ekonomi</span>
        </motion.div>
      </div>

      <footer className="fixed bottom-6 text-xs text-muted-foreground font-bold uppercase tracking-[0.2em] z-10">
        Made With <a href="https://adityaputra-portofolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4">Aditya Arta Putra X TJKT A SMKM BANDONGAN</a>
      </footer>
    </main>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TASKS = [
  "Selesaikan verifikasi untuk melanjutkan",
  "Konfirmasi bahwa Anda adalah manusia",
  "Klik tombol di bawah untuk masuk",
  "Verifikasi Keamanan: Klik tombol"
];

export function BackgroundVideo() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationTask] = useState(() => TASKS[Math.floor(Math.random() * TASKS.length)]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const verified = sessionStorage.getItem("is_human_verified");
    if (verified === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVerified(true);
    }
  }, []);

  const handleVerify = () => {
    setIsVerified(true);
    sessionStorage.setItem("is_human_verified", "true");
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
        <video
          ref={videoRef}
          src="https://api.deline.web.id/nKT00jDXVR.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "h-full w-full object-cover transition-opacity duration-1000",
            isVerified ? "opacity-30" : "opacity-0"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <AnimatePresence>
        {!isVerified && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-xl"
            onClick={handleVerify}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center space-y-6 p-10 rounded-3xl bg-card/50 border border-white/10 shadow-2xl max-w-sm w-full text-center backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent animate-pulse">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight">Verifikasi Manusia</h2>
                <p className="text-muted-foreground">
                  {verificationTask}
                </p>
              </div>
              <button
                onClick={handleVerify}
                className="group relative w-full py-4 px-6 bg-accent text-accent-foreground rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Saya Bukan Robot
                  <MousePointer2 className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
                Desa Ngawonggo • Mandiri & Digital
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface SearchResultItemProps {
  result: {
    title: string;
    url: string;
    description: string;
    thumbnail?: { src: string };
    profile?: { name: string; url: string; img: string };
  };
  index: number;
}

export function SearchResultItem({ result, index }: SearchResultItemProps) {
  const thumbnail = result.thumbnail?.src;
  const displayLink = new URL(result.url).hostname;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex flex-col space-y-1 py-4 border-b border-border last:border-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground truncate">
            {result.profile?.img && (
              <img src={result.profile.img} alt="" className="w-4 h-4 rounded-full" />
            )}
            <span>{result.profile?.name || displayLink}</span>
          </div>
          <Link
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group-hover:underline underline-offset-4 decoration-accent"
          >
            <h3 className="text-lg font-medium text-accent truncate">
              {result.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {result.description}
          </p>
        </div>
        {thumbnail && (
          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted relative">
            <Image
              src={thumbnail}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
              unoptimized
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

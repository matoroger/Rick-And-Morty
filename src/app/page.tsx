"use client";

import { useState } from "react";
import CharacterList from "@/components/CharacterList";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-8 text-center animate-fade-in-up">
        Rick and Morty Characters
      </h1>

      {/* Floating Search Bar */}
      <div className="floating-search mb-8 relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-14 py-3 rounded-xl border-none bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
        />

        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
          />
        </svg>
      </div>

      {/* Character List */}
      <CharacterList search={search} />
    </main>
  );
}

"use client";

import { useState } from "react";
import CharacterList from "@/components/CharacterList";

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "status"
  | "species";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");

  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4 text-center animate-fade-in-up">
        Rick and Morty Characters
      </h1>

      {/* Filters */}
      <div className="filter-wrapper">
        <div className="filter-card">

          <div className="relative">
            <input
              type="text"
              placeholder="Search characters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="filter-control filter-search"
            />

            <svg
              className="filter-icon-left"
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

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="filter-control filter-select"
            >
              <option value="name-asc">Sort by Name (A–Z)</option>
              <option value="name-desc">Sort by Name (Z–A)</option>
              <option value="status">Sort by Status</option>
              <option value="species">Sort by Species</option>
            </select>

            <svg
              className="filter-icon-right"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

        </div>
      </div>

      {/* Character List */}
      <CharacterList search={search} sort={sort} />
    </main>
  );
}

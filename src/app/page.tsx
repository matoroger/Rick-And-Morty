"use client";

import CharacterList from "@/components/CharacterList";

export default function HomePage() {
  return (
    <main className="w-full px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">
        Rick and Morty Characters
      </h1>
      <CharacterList />
    </main>
  );
}

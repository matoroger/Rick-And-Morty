"use client";

import CharacterList from "@/components/CharacterList";

export default function HomePage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Rick and Morty Characters</h1>
      <CharacterList />
    </main>
  );
}

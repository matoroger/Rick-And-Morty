import { useState } from "react";

type Character = {
  id: number;
  name: string;
  image: string;
};

type CharacterSearchProps = {
  characters: Character[];
};

export default function CharacterSearch({ characters }: CharacterSearchProps) {
  const [search, setSearch] = useState("");

  const filterCharacters = (query: string) => {
    return characters.filter((char) =>
      char.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredCharacters = filterCharacters(search);

  return (
    <div>
      {/* Search Bar */}
      <div className="floating-search">
        <input
          type="text"
          placeholder="Search characters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
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
      <div className="character-list">
        {filteredCharacters.map((char) => (
          <div key={char.id} className="character-card">
            <img src={char.image} alt={char.name} style={{ borderRadius: "8px" }} />
            <h3>{char.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

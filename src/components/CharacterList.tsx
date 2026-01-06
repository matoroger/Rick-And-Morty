"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_CHARACTERS } from "@/graphql/queries";

type Character = {
  id: string;
  name: string;
  species: string;
  image: string;
};

type CharactersData = {
  characters: {
    results: Character[];
  };
};

export default function CharacterList() {
  const { data, loading, error } = useQuery<CharactersData>(GET_CHARACTERS);

  if (loading) return <p>Loading characters...</p>;
  if (error || !data) return <p>Failed to load characters</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {data.characters.results.map((char) => (
        <Link key={char.id} href={`/character/${char.id}`}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              cursor: "pointer",
              width: "150px",
              textAlign: "center",
            }}
          >
            <img src={char.image} alt={char.name} width={150} />
            <h3>{char.name}</h3>
            <p>{char.species}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

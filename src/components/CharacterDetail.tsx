"use client";

type Episode = { id: string; name: string };
type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  episode: Episode[];
};

export default function CharacterDetail({ character }: { character: Character }) {
  return (
    <div style={{ padding: "20px" }}>
      <img src={character.image} alt={character.name} width={200} />
      <h1>{character.name}</h1>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>

      <h2>Episodes</h2>
      <ul>
        {character.episode.map((ep) => (
          <li key={ep.id}>{ep.name}</li>
        ))}
      </ul>
    </div>
  );
}

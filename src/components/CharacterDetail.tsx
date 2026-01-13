"use client";

import Image from "next/image";
import EpisodeList from "@/app/character/[id]/EpisodeList";

type Episode = { id: string; name: string; episode: string };

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  episode: Episode[];
};

type Props = { character: Character };

export default function CharacterDetail({ character }: Props) {
  return (
    <div className="character-card">
      {/* Character Header */}
      <div className="character-header">
        <div className="character-image">
          <Image
            src={character.image}
            alt={character.name}
            width={120}
            height={120}
            className="object-cover"
          />
          <span
            className={`character-status-badge ${
              character.status.toLowerCase() || "unknown"
            }`}
          >
            {character.status}
          </span>
        </div>

        <div className="character-info">
          <h1>{character.name}</h1>
          <p>
            {character.species} • {character.gender}
          </p>
          <div className="mt-2">
            <span className="info-box">Origin: {character.origin.name}</span>
            <span className="info-box">Location: {character.location.name}</span>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="episode-section">
        <h2>Episodes</h2>
        <EpisodeList episodes={character.episode} />
      </div>
    </div>
  );
}

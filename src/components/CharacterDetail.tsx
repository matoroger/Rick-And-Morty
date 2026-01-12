import Image from "next/image";

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
      {/* Header */}
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
          <p>{character.species} • {character.gender}</p>
          <div className="mt-2">
            <span className="info-box">Origin: {character.origin.name}</span>
            <span className="info-box">Location: {character.location.name}</span>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="episode-section">
        <h2>Episodes</h2>
        {character.episode.length > 0 ? (
          <ul className="episode-list">
            {character.episode.map((ep) => (
              <li key={ep.id} className="episode-card">
                <span className="episode-name">{ep.name}</span>
                <span className="episode-code">{ep.episode}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No episodes available.</p>
        )}
      </div>
    </div>
  );
}

/* =========================
   INFO COMPONENT
   ========================= */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-700/50 rounded-md px-2 py-1">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

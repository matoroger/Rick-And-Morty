"use client";
import { useRouter } from "next/navigation";

type Episode = {
  id: string;
  name: string;
  episode: string;
};

type Props = {
  episodes: Episode[];
};

export default function EpisodeList({ episodes }: Props) {
  const router = useRouter();

  const getSeasonClass = (code: string) => {
    const match = code.match(/S(\d+)/);
    if (!match) return "season-unknown";
    return `season-${parseInt(match[1])}`;
  };

  if (episodes.length === 0) {
    return <p className="text-muted">No episodes available.</p>;
  }

  return (
    <ul className="episode-list">
      {episodes.map((ep) => (
        <li
          key={ep.id}
          className="episode-card"
          onClick={() => router.push(`/episodes/${ep.id}`)}
        >
          <span className="episode-name">{ep.name}</span>
          <span className="episode-code">
            {ep.episode}{" "}
            <span className={`episode-badge ${getSeasonClass(ep.episode)}`}>
              {ep.episode.slice(0, 3)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

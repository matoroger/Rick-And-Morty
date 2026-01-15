"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_CHARACTERS } from "@/graphql/queries";

/* ✅ ADD SORT TYPE (matches HomePage) */
export type SortOption =
  | "name-asc"
  | "name-desc"
  | "status"
  | "species";

type Character = {
  id: string;
  name: string;
  species: string;
  status: "Alive" | "Dead" | "unknown";
  image: string;
};

type CharactersData = {
  characters: {
    results: Character[];
  };
};

/* ✅ UPDATE PROPS */
type CharacterListProps = {
  search: string;
  sort: SortOption;
};

export default function CharacterList({ search, sort }: CharacterListProps) {
  const { data, loading, error } = useQuery<CharactersData>(GET_CHARACTERS);

  if (loading)
    return (
      <p className="text-center mt-10 text-zinc-400">
        Loading characters...
      </p>
    );

  if (error || !data)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load characters
      </p>
    );

  /* ✅ FILTER + SORT CHARACTERS */
  const filteredCharacters = data.characters.results
    .filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    )
   .sort((a, b) => {
  switch (sort) {
    case "name-asc":
      return (a.name ?? "").localeCompare(b.name ?? "");

    case "name-desc":
      return (b.name ?? "").localeCompare(a.name ?? "");

    case "status": {
      const statusOrder: Record<string, number> = {
        Alive: 0,
        Dead: 1,
        unknown: 2,
      };

      return (
        (statusOrder[a.status ?? "unknown"] ?? 2) -
        (statusOrder[b.status ?? "unknown"] ?? 2)
      );
    }

    case "species":
      return (a.species ?? "").localeCompare(b.species ?? "");

    default:
      return 0;
  }
});


  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
      {filteredCharacters.map((char) => (
        <Link key={char.id} href={`/character/${char.id}`}>
          <div className="group w-40 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden">

            {/* IMAGE + STATUS */}
            <div className="relative w-full h-40">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-full object-cover"
              />

              <span
                className={`absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full font-medium backdrop-blur
                  ${
                    char.status === "Alive"
                      ? "bg-green-500/20 text-green-400"
                      : char.status === "Dead"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-500/20 text-gray-300"
                  }
                `}
              >
                {char.status}
              </span>
            </div>

            {/* INFO */}
            <div className="p-3 text-center">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-white truncate">
                {char.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {char.species}
              </p>
            </div>

          </div>
        </Link>
      ))}

      {/* ✅ EMPTY STATE */}
      {filteredCharacters.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No characters found
        </p>
      )}
    </div>
  );
}

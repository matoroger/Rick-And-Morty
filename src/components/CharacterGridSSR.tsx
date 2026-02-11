import Link from "next/link";
import { Character, SortOption } from "@/components/CharacterListClient";

export default function CharacterGridSSR({
  initialCharacters,
  search,
  sort,
}: {
  initialCharacters: Character[];
  search: string;
  sort: SortOption;
}) {
  const filteredCharacters = initialCharacters
    .filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sort) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "status": {
          const statusOrder: Record<string, number> = {
            Alive: 0,
            Dead: 1,
            unknown: 2,
          };
          return statusOrder[a.status] - statusOrder[b.status];
        }
        case "species":
          return a.species.localeCompare(b.species);
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
      {filteredCharacters.map((char) => (
        <Link key={char.id} href={`/character/${char.id}`}>
          <div className="group w-40 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden">
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

      {filteredCharacters.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No characters found.
        </p>
      )}
    </div>
  );
}

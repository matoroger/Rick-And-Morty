"use client";

import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_CHARACTERS } from "@/graphql/queries";
import CharacterSkeleton from "@/components/CharacterSkeleton";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

/* SORT TYPE */
export type SortOption = "name-asc" | "name-desc" | "status" | "species";

/* CHARACTER TYPES */
export type Character = {
  id: string;
  name: string;
  species: string;
  status: "Alive" | "Dead" | "unknown";
  image: string;
};

export type CharactersData = {
  characters: {
    info: { next: number | null };
    results: Character[];
  };
};

type CharacterListProps = {
  search: string;
  sort: SortOption;
};

export default function CharacterListClient({
  search,
  sort,
}: CharacterListProps) {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
    refetch,
  } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  /* INITIAL LOADING STATE */
  if (loading && !data) {
    return (
      <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
        {Array.from({ length: 8 }).map((_, idx) => (
          <CharacterSkeleton key={idx} />
        ))}
      </div>
    );
  }

  /* ERROR STATE */
  if (error) {
    return (
      <ErrorState
        message="Failed to load characters. Please check your connection."
        onRetry={() => refetch()}
      />
    );
  }

  if (!data?.characters) return null;

  /* FILTER + SORT */
  const filteredCharacters = data.characters.results
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
    <>
      {/* CHARACTER GRID */}
      <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
        {filteredCharacters.map((char) => (
          <Link key={char.id} href={`/character/${char.id}`}>
            <div className="group w-40 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden">
              {/* IMAGE */}
              <div className="relative w-full h-40">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover"
                />

                {/* STATUS BADGE */}
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

        {/* LOAD MORE SKELETONS */}
        {isFetchingMore &&
          Array.from({ length: 4 }).map((_, idx) => (
            <CharacterSkeleton key={`load-more-${idx}`} />
          ))}

        {/* EMPTY STATE */}
        {filteredCharacters.length === 0 && (
          <EmptyState
            title="No characters found"
            description="Try a different name or clear your filters."
          />
        )}
      </div>

      {/* LOAD MORE BUTTON */}
      {data.characters.info.next && (
        <div className="w-full flex justify-center mb-10">
          <button
            disabled={isFetchingMore}
            onClick={() => {
              if (!data.characters.info.next) return;

              fetchMore({
                variables: { page: data.characters.info.next },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult?.characters || !prev?.characters) {
                    return prev;
                  }

                  return {
                    characters: {
                      info: fetchMoreResult.characters.info,
                      results: [
                        ...prev.characters.results,
                        ...fetchMoreResult.characters.results,
                      ],
                    },
                  };
                },
              });
            }}
            className="load-more-btn"
          >
            {isFetchingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}

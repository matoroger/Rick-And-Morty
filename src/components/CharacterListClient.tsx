"use client";

import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { GET_CHARACTERS } from "@/graphql/queries";
import ErrorState from "@/components/ErrorState";
import { useState } from "react";

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

type Props = {
  initialNextPage: number | null;
};

export default function CharacterListClient({ initialNextPage }: Props) {
  const [extraCharacters, setExtraCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(initialNextPage);

  const { fetchMore, networkStatus, refetch, error } = useQuery<CharactersData>(
    GET_CHARACTERS,
    {
      variables: { page: 1 },
      notifyOnNetworkStatusChange: true,
      skip: true, // ⛔ don't run initial query
    }
  );

  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  if (error) {
    return (
      <ErrorState
        message="Failed to load more characters."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <>
      {/* EXTRA LOADED CHARACTERS ONLY */}
      {extraCharacters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 px-4 pb-10">
          {extraCharacters.map((char) => (
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
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {nextPage && (
        <div className="w-full flex justify-center mb-10">
          <button
            disabled={isFetchingMore}
            onClick={async () => {
              if (!nextPage) return;

              const { data } = await fetchMore({
                variables: { page: nextPage },
              });

              if (data?.characters) {
                setExtraCharacters((prev) => [
                  ...prev,
                  ...data.characters.results,
                ]);
                setNextPage(data.characters.info.next);
              }
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

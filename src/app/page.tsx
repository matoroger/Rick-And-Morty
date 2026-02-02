import CharacterListClient from "@/components/CharacterListClient";
import { SortOption } from "@/components/CharacterListClient";

type SearchParams = {
  search?: string;
  sort?: SortOption;
};

async function getCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "no-store", // SSR always fresh (SEO-safe)
  });

  if (!res.ok) throw new Error("Failed to fetch characters");

  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await getCharacters();

  return (
    <CharacterListClient
      initialCharacters={data.results}
      initialNextPage={data.info.next}
      search={searchParams.search ?? ""}
      sort={searchParams.sort ?? "name-asc"}
    />
  );
}

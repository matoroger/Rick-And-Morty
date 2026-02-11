import CharacterListClient, {
  SortOption,
  Character,
} from "@/components/CharacterListClient";
import CharacterGridSSR from "@/components/CharacterGridSSR";

type SearchParams = {
  search?: string;
  sort?: SortOption;
};

async function getCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams; // ✅ unwrap promise

  const data = await getCharacters();

  const initialCharacters: Character[] = data.results;
  const initialNextPage: number | null = data.info.next;

  const search = sp.search ?? "";
  const sort = sp.sort ?? "name-asc";

  return (
    <>
      <CharacterGridSSR
        initialCharacters={initialCharacters}
        search={search}
        sort={sort}
      />

      <CharacterListClient initialNextPage={initialNextPage} />
    </>
  );
}

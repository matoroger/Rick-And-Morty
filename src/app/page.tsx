import CharacterList from "@/components/CharacterList";
import { SortOption } from "@/components/CharacterListClient";

type SearchParams = {
  search?: string;
  sort?: SortOption;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <CharacterList
      search={params.search ?? ""}
      sort={params.sort ?? "name-asc"}
    />
  );
}

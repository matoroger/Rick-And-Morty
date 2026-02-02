import CharacterListClient from "@/components/CharacterListClient";
import { SortOption, Character } from "@/components/CharacterListClient";

type Props = {
  initialCharacters: Character[];
  initialNextPage: number | null;
  search: string;
  sort: SortOption;
};

export default function CharacterList({
  initialCharacters,
  initialNextPage,
  search,
  sort,
}: Props) {
  return (
    <CharacterListClient
      initialCharacters={initialCharacters}
      initialNextPage={initialNextPage}
      search={search}
      sort={sort}
    />
  );
}

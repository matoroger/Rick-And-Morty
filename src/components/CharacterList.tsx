import CharacterListClient, { SortOption } from "./CharacterListClient";

type CharacterListProps = {
  search: string;
  sort: SortOption;
};

export default function CharacterList({
  search,
  sort,
}: CharacterListProps) {
  return <CharacterListClient search={search} sort={sort} />;
}

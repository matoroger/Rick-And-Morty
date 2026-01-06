"use client";

import { use } from "react"; // React 18 / Next 13+
import CharacterDetail from "@/components/CharacterDetail";
import { GET_CHARACTER } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";

type Episode = { id: string; name: string };
type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
  episode: Episode[];
};
type CharacterData = { character: Character };

type PageProps = {
  params: Promise<{ id: string }>; // client component receives Promise
};

export default function CharacterPage({ params }: PageProps) {
  const { id } = use(params); // unwrap Promise

  const { data, loading, error } = useQuery<CharacterData>(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return <p>Loading character...</p>;
  if (error || !data?.character)
    return <p>Failed to fetch character. Please try again later.</p>;

  return <CharacterDetail character={data.character} />;
}

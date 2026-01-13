// No "use client" here
import CharacterDetail from "@/components/CharacterDetail";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

type Episode = { id: string; name: string; episode: string };
type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  episode: Episode[];
};

type PageProps = {
  params: Promise<{ id: string }>;
};

/* GraphQL query */
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      origin { name }
      location { name }
      episode { id name episode }
    }
  }
`;

/* Apollo client (server-compatible) */
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
    fetch, // MUST include this for server-side fetching
  }),
  cache: new InMemoryCache(),
});

/* Page Component */
export default async function CharacterDetailPage({ params }: PageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-start px-4 py-12">
      <CharacterDetail character={character} />
    </div>
  );
}

/* Server-side fetch function */
async function getCharacter(id: string): Promise<Character> {
  try {
    const { data } = await client.query<{ character: Character }>({
      query: GET_CHARACTER,
      variables: { id },
      fetchPolicy: "no-cache",
    });

    if (!data?.character) {
      throw new Error("Character not found");
    }

    return data.character;
  } catch (err: any) {
    console.error("GraphQL fetch error:", err.message || err);
    throw new Error("Could not load character data");
  }
}

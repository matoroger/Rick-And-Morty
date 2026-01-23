// NO "use client"
import Link from "next/link";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

/* Types */
type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
};

type Episode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: Character[];
};

type PageProps = {
  params: Promise<{ id: string }>;
};

/* Query */
const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        image
        species
      }
    }
  }
`;

/* Server Apollo Client */
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});

/* Page */
export default async function EpisodeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const episode = await getEpisode(id);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">{episode.name}</h1>
        <p className="text-zinc-400">{episode.episode}</p>
        <p className="text-zinc-400 mb-8">
          Air date: {episode.air_date}
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Characters in this episode
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {episode.characters.map((char) => (
            <Link
              key={char.id}
              href={`/character/${char.id}`}
              className="rounded-lg border border-zinc-700 hover:border-zinc-500 transition overflow-hidden"
            >
              <img src={char.image} alt={char.name} />
              <div className="p-2">
                <p className="font-medium">{char.name}</p>
                <p className="text-sm text-zinc-400">{char.species}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Fetcher */
async function getEpisode(id: string): Promise<Episode> {
  const { data } = await client.query<{ episode: Episode }>({
    query: GET_EPISODE,
    variables: { id },
    fetchPolicy: "no-cache",
  });

  if (!data?.episode) {
    throw new Error("Episode not found");
  }

  return data.episode;
}

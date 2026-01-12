import CharacterDetail from "@/components/CharacterDetail";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  episode: { id: string; name: string; episode: string }[]; // Make sure episodes are included
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CharacterDetailPage({ params }: PageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-start px-4 py-12">
      {/* Use the CharacterDetail component here */}
      <CharacterDetail character={character} />
    </div>
  );
}

/* =========================
   DATA FETCH
   ========================= */
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch character ${id}`);
  }

  const data = await res.json();

  // Fetch episodes
  const episodes = await Promise.all(
    data.episode.map(async (url: string) => {
      const epRes = await fetch(url, { cache: "no-store" });
      if (!epRes.ok) throw new Error("Failed to fetch episode");
      return epRes.json();
    })
  );

  return { ...data, episode: episodes };
}

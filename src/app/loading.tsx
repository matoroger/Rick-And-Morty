import CharacterSkeleton from "@/components/CharacterSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <CharacterSkeleton key={i} />
      ))}
    </div>
  );
}

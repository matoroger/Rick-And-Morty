"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function HomeClient() {
  const router = useRouter();
  const params = useSearchParams();

  const search = params.get("search") ?? "";
  const sort = params.get("sort") ?? "name-asc";

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set(key, value);
    router.push(`/?${newParams.toString()}`);
  };

  return (
    <>
      <input
        value={search}
        onChange={(e) => updateParam("search", e.target.value)}
      />

      <select
        value={sort}
        onChange={(e) => updateParam("sort", e.target.value)}
      >
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
        <option value="status">Status</option>
        <option value="species">Species</option>
      </select>
    </>
  );
}

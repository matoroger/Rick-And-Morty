"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h2 className="text-xl font-semibold mb-4">
        Something went wrong 😬
      </h2>
      <button
        onClick={reset}
        className="px-4 py-2 rounded bg-black text-white"
      >
        Try again
      </button>
    </div>
  );
}

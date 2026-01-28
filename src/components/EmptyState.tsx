type EmptyStateProps = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">🫥</div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
        {description}
      </p>
    </div>
  );
}

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4">⚠️</div>

      <p className="text-lg font-semibold text-gray-800 dark:text-white">
        Oops! Something went wrong
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="group block animate-pulse space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Title */}
      <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>

      {/* Body */}
      <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>

      {/* Date */}
      <div className="h-3 w-1/3 rounded bg-gray-300 dark:bg-gray-700"></div>

      {/* Footer */}
      <div className="h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-700"></div>
    </div>
  );
}

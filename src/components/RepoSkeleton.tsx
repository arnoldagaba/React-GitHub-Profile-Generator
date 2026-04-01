const RepoSkeleton = () => (
  <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-slate-700 animate-pulse">
    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-6" />
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-full mb-3" />
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-16" />
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-16" />
            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RepoSkeleton;

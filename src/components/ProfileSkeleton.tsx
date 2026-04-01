const ProfileSkeleton = () => (
  <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-slate-700 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600" />
      <div className="flex-1">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-32 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-64" />
      </div>
    </div>
    <div className="mt-6 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-40" />
      <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-32" />
      <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-36" />
      <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-28" />
    </div>
    <div className="mt-6 flex gap-4">
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-32" />
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-28" />
    </div>
  </div>
);

export default ProfileSkeleton;

import { useEffect, useState, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { CacheContext } from '../context/CacheContext';
import type { GitHubRepo, SortOption } from '../types/github';
import RepoSkeleton from '../components/RepoSkeleton';

const CACHE_TTL = 5 * 60 * 1000;
const REPOS_PER_PAGE = 8;

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};

const Repositories = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { getCache, setCache } = useContext(CacheContext);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('stars');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');

  const fetchRepos = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    const cached = getCache<GitHubRepo[]>(`repos:${username}`, CACHE_TTL);
    if (cached) {
      setRepos(cached);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`);
      setRepos(response.data);
      setCache(`repos:${username}`, response.data);
    } catch {
      setError('Failed to load repositories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setFilterLanguage('all');
    fetchRepos();
  }, [username]);

  const languages = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter((l): l is string => Boolean(l)));
    return Array.from(langs).sort();
  }, [repos]);

  const filteredAndSorted = useMemo(() => {
    let result = [...repos];
    if (filterLanguage !== 'all') {
      result = result.filter((r) => r.language === filterLanguage);
    }
    switch (sortBy) {
      case 'stars':
        result.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'forks':
        result.sort((a, b) => b.forks_count - a.forks_count);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'updated':
        result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
    }
    return result;
  }, [repos, sortBy, filterLanguage]);

  const totalPages = Math.ceil(filteredAndSorted.length / REPOS_PER_PAGE);
  const paginatedRepos = filteredAndSorted.slice(
    (currentPage - 1) * REPOS_PER_PAGE,
    currentPage * REPOS_PER_PAGE,
  );

  if (loading) return <RepoSkeleton />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-slate-700 text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={fetchRepos}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-slate-700">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold dark:text-white">Repositories ({filteredAndSorted.length})</h1>
        <div className="flex gap-3 flex-wrap">
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value as SortOption); setCurrentPage(1); }}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white text-sm"
          >
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="name">Name A-Z</option>
            <option value="updated">Recently Updated</option>
          </select>
          <select
            value={filterLanguage}
            onChange={(e) => { setFilterLanguage(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white text-sm"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No repositories found.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {paginatedRepos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || '#888' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                      </svg>
                      {repo.stargazers_count.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5.5 2a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5A.75.75 0 005.5 2zm5 0a.75.75 0 00-.75.75v1.5a.75.75 0 001.5 0v-1.5a.75.75 0 00-.75-.75z" />
                      </svg>
                      {repo.forks_count.toLocaleString()}
                    </span>
                    <span>
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-md text-sm transition-colors ${
                    i + 1 === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate(`/profile/${username}`)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default Repositories;

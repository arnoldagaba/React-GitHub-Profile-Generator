import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { CacheContext } from '../context/CacheContext';
import type { GitHubUser } from '../types/github';
import ProfileSkeleton from '../components/ProfileSkeleton';

const CACHE_TTL = 5 * 60 * 1000;

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { getCache, setCache } = useContext(CacheContext);
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    const cached = getCache<GitHubUser>(`profile:${username}`, CACHE_TTL);
    if (cached) {
      setProfile(cached);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get<GitHubUser>(`/users/${username}`);
      setProfile(response.data);
      setCache(`profile:${username}`, response.data);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 404) {
        setError('User not found. Please check the username and try again.');
      } else if (status === 403) {
        setError('Rate limit exceeded. Please try again later or add a GitHub token.');
      } else {
        setError('Failed to fetch profile. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  if (loading) return <ProfileSkeleton />;
  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-slate-700 text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg dark:bg-slate-700 dark:text-white">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{profile.name || profile.login}</h1>
          <p className="text-gray-500 dark:text-gray-400">@{profile.login}</p>
          {profile.bio && <p className="mt-2 text-gray-700 dark:text-gray-300">{profile.bio}</p>}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        {profile.location && (
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Location:</span> {profile.location}
          </p>
        )}
        {profile.company && (
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Company:</span> {profile.company}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Followers:</span> {profile.followers.toLocaleString()}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Following:</span> {profile.following.toLocaleString()}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Repositories:</span> {profile.public_repos}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Gists:</span> {profile.public_gists}
        </p>
        <p className="text-gray-600 dark:text-gray-300 col-span-2">
          <span className="font-semibold">Joined:</span>{' '}
          {new Date(profile.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {profile.blog && (
          <p className="text-gray-600 dark:text-gray-300 col-span-2">
            <span className="font-semibold">Blog:</span>{' '}
            <a
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {profile.blog}
            </a>
          </p>
        )}
        {profile.twitter_username && (
          <p className="text-gray-600 dark:text-gray-300 col-span-2">
            <span className="font-semibold">Twitter:</span>{' '}
            <a
              href={`https://twitter.com/${profile.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @{profile.twitter_username}
            </a>
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/profile/${username}/repositories`}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View Repositories
        </Link>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          View on GitHub
        </a>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          Back to Search
        </button>
      </div>
    </div>
  );
};

export default Profile;

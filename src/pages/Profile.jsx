import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setProfile(response.data);
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      {profile && (
        <>
          <div className="flex items-center">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-24 h-24 rounded-full mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold">{profile.name || profile.login}</h1>
              <p className="text-gray-500">@{profile.login}</p>
              <p className="mt-2">{profile.bio}</p>
            </div>
          </div>
          <div className="mt-4">
            <p>Location: {profile.location || 'Not provided'}</p>
            <p>Followers: {profile.followers}</p>
            <p>Following: {profile.following}</p>
            <p>Repositories: {profile.public_repos}</p>
            <p>Joined GitHub: {new Date(profile.created_at).toLocaleDateString()}</p>
          </div>

          <Link
            to={`/profile/${username}/repositories`}
            className="block mt-4 text-blue-500 hover:underline"
          >
            View Repositories
          </Link>

          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-500"
          >
            View on GitHub
          </a>
        </>
      )}
    </div>
  );
};

export default Profile;

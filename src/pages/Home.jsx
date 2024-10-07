import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <div className="home flex justify-center items-center h-screen bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-gray-200 p-6 shadow-lg rounded-md">
        <h1 className="intro-name text-2xl font-bold mb-4 text-center">GitHub Profile Search</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
        />
        <button type="submit" className="intro-btn bg-blue-500 text-white px-4 py-2 rounded-md w-full">
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;

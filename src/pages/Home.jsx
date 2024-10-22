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
    <div className="home flex justify-center items-center h-[81vh] bg-slate-200 dark:bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 shadow-lg rounded-md backdrop-blur-3xl dark:bg-gray-800">
        <h1 className="text-gray-800 text-2xl font-bold mb-4 text-center dark:text-slate-200">GitHub Profile Search</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="text-white border-gray-300 py-2 px-4 rounded-md w-full mb-4 outline-0 border-0 placeholder:text-black dark:bg-slate-500 dark:placeholder:text-white"
        />
        <button type="submit" className="bg-blue-500 dark:bg-black text-white px-4 py-2 rounded-md w-full">
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;

import { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import darkLogo from '../assets/icons8-github.svg';
import lightLogo from '../assets/icons8-github (1).svg';
import { ThemeContext } from '../context/ThemeContext';

const USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUsername = useCallback((value: string): boolean => {
    if (!value.trim()) {
      setError('Username is required');
      return false;
    }
    if (!USERNAME_REGEX.test(value.trim())) {
      setError('Invalid username. Use 1-39 alphanumeric chars or hyphens.');
      return false;
    }
    setError('');
    return true;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUsername(username)) {
      navigate(`/profile/${username.trim()}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
    setUsername(value);
    if (error) validateUsername(value);
  };

  return (
    <div className="home flex justify-center items-center h-[75vh] md:h-[81vh] bg-slate-200 dark:bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-[95vw] md:max-w-[35vw] bg-gray-100 p-6 shadow-lg rounded-md backdrop-blur-3xl dark:bg-gray-800"
      >
        <h1 className="text-gray-800 text-2xl font-bold mb-4 text-center dark:text-slate-200">
          GitHub Profile Search
        </h1>

        <div className="flex flex-col items-center justify-center">
          <img
            src={theme === 'light' ? darkLogo : lightLogo}
            alt="GitHub logo"
            width={50}
          />
          <p className="text-black text-center text-sm dark:text-white py-4">
            Enter a GitHub username to instantly view and explore all key
            details about the user in a stylish and organized layout.
          </p>
        </div>

        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter GitHub username"
          className={`text-black border py-2 px-4 rounded-md w-full outline-0 placeholder:text-black dark:bg-slate-500 dark:text-white dark:placeholder:text-white ${
            error
              ? 'border-2 border-red-500 mb-1'
              : 'border-gray-300 mb-4'
          }`}
        />
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={!username.trim()}
          className="bg-blue-500 dark:bg-black text-white px-4 py-2 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 dark:hover:bg-gray-900 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import 'boxicons/css/boxicons.min.css';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  return (
    <header className="p-4 flex justify-between items-center bg-gray-100 text-black dark:bg-gray-800 dark:text-white">
      <Link to="/" className="text-xl font-bold">
        GitHub Profile Generator
      </Link>
      <nav className="flex items-center gap-4">
        {location.pathname !== '/' && (
          <Link
            to="/"
            className="font-semibold bg-black text-white px-5 py-2 rounded-lg dark:text-black dark:bg-white hover:opacity-90 transition-opacity"
          >
            Search
          </Link>
        )}
        <button
          onClick={toggleTheme}
          className="focus:outline-none p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <i className="bx bx-moon text-2xl" />
          ) : (
            <i className="bx bx-sun text-2xl" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import 'boxicons/css/boxicons.min.css';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`p-4 flex justify-between items-center ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <Link to="/" className="text-xl font-bold">
        GitHub Profile Generator
      </Link>
      <nav className='flex justify-between items-center'>
        <Link to="/" className="search-btn font-semibold mr-7 bg-blue-800 px-5 py-2 rounded-lg">
          Search
        </Link>
        <button onClick={toggleTheme} className="focus:outline-none">
          {theme === 'light' ? (
            <i className="bx bx-moon text-2xl"></i>
          ) : (
            <i className="bx bx-sun text-2xl"></i>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;

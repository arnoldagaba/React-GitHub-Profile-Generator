import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Repositories from './components/Repositories';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
        <div className="wrapper min-h-screen flex flex-col bg-white text-black dark:bg-[#1a202c] dark:text-[rgb(130, 130, 130)]">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/profile/:username/repositories" element={<Repositories />} />
            </Routes>
          </main>
          <Footer />
        </div>
  );
}

export default App;

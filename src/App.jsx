import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Repositories from './components/Repositories';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
      <ThemeProvider>
        <div className="wrapper min-h-screen flex flex-col">
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
      </ThemeProvider>
    </MantineProvider>
  );
}

export default App;

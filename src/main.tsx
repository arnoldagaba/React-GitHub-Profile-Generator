import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { CacheProvider } from './context/CacheContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CacheProvider>
          <App />
        </CacheProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { CacheProvider } from '../context/CacheContext';
import Home from '../pages/Home';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <CacheProvider>{component}</CacheProvider>
      </ThemeProvider>
    </BrowserRouter>,
  );
};

describe('Home', () => {
  it('renders the search form', () => {
    const { getByText, getByPlaceholderText, getByRole } = renderWithProviders(<Home />);
    expect(getByText('GitHub Profile Search')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter GitHub username')).toBeInTheDocument();
    expect(getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('disables search button when input is empty', () => {
    const { getByRole } = renderWithProviders(<Home />);
    expect(getByRole('button', { name: /search/i })).toBeDisabled();
  });
});

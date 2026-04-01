# GitHub Profile Generator

A React + TypeScript application that lets you search for any GitHub username and view their profile information and public repositories in a clean, organized interface.

## Features

- **Profile Search** — Enter any GitHub username to view their profile
- **Rich Profile Display** — Avatar, name, bio, location, company, followers/following, gists, blog, Twitter, and join date
- **Repository Browser** — View all public repos with descriptions, stars, forks, language, and last-updated date
- **Sorting & Filtering** — Sort repos by stars, forks, name, or recently updated. Filter by programming language
- **Pagination** — Navigate through repos 8 per page with prev/next controls
- **Dark/Light Theme** — Toggle between themes with preference saved to localStorage
- **API Caching** — Profile and repo data cached for 5 minutes to reduce API calls
- **Rate Limit Protection** — Supports GitHub personal access tokens via `.env` (60 → 5000 requests/hour)
- **Input Validation** — Validates usernames against GitHub's naming rules
- **Loading Skeletons** — Animated placeholders while data loads
- **Error Handling** — Clear error messages with retry functionality for 404, rate limits, and network errors
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds and HMR
- **Tailwind CSS** for styling
- **React Router v6** for client-side routing
- **Axios** for API requests
- **Vitest + React Testing Library** for testing

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd React-GitHub-Profile-Generator

# Install dependencies
npm install

# Copy the environment file
cp .env.example .env

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### GitHub API Token (Optional but Recommended)

Without a token, the GitHub API limits you to 60 requests/hour. To increase this to 5000 requests/hour:

1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Generate a new classic token (no scopes needed for public data)
3. Add it to your `.env` file:

```env
VITE_GITHUB_TOKEN=ghp_your_token_here
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |

## Project Structure

```
src/
├── assets/              # Static assets (icons, images)
├── components/          # Reusable UI components
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProfileSkeleton.tsx
│   ├── RepoSkeleton.tsx
│   └── Repositories.tsx
├── context/             # React context providers
│   ├── CacheContext.tsx
│   └── ThemeContext.tsx
├── pages/               # Route-level page components
│   ├── Home.tsx
│   └── Profile.tsx
├── test/                # Test files
│   ├── Home.test.tsx
│   ├── ThemeContext.test.tsx
│   └── setup.ts
├── types/               # TypeScript type definitions
│   └── github.ts
├── utils/               # Utility functions
│   └── api.ts
├── App.tsx              # Main app component with routes
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## License

MIT

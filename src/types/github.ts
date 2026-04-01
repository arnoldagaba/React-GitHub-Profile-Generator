export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  company: string | null;
  blog: string;
  twitter_username: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
}

export type SortOption = 'stars' | 'forks' | 'name' | 'updated';

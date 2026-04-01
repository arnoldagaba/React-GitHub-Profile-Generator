import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }),
  },
});

export default api;

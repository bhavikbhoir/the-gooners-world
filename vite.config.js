import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    build: { outDir: 'build' },
    define: { 'process.env': {} },
    server: {
      proxy: {
        '/api/football': {
          target: 'https://api.football-data.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/football/, '/v4'),
          headers: { 'X-Auth-Token': env.VITE_FOOTBALL_API_KEY },
        },
        '/api/news': {
          target: 'https://newsdata.io',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/news/, '/api/1/latest'),
        },
        '/api/ai': {
          target: env.VITE_API_BASE || 'http://localhost:3000/dev',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ai/, '/proxy/ai'),
          headers: { 'x-api-key': env.VITE_API_GW_KEY || '' },
        },
      },
    },
  };
});

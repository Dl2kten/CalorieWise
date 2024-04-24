import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // configure: (proxy) => {
        //   proxy.on('error', (err, req, res) => {
        //     console.error('Proxy error:', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq, req, res) => {
        //     // Forward all HTTP methods to the target server
        //     proxyReq.method = req.method;
        //   });
        // },
      },
    },
  },
})

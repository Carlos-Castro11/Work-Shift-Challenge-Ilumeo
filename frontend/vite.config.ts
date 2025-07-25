import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  assetsInclude: ['**/*.webp'],
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['ag-grid-community', 'ag-grid-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
})

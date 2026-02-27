import path from "path"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  logLevel: 'info',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://qmniikvuvodjnqelqaou.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbmlpa3Z1dm9kam5xZWxxYW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MDEzNDAsImV4cCI6MjA4NjQ3NzM0MH0.14ud7xxkG238jtbYI33hhGX2cjbPj3Vg9H6CEcRpWAw'),
    'import.meta.env.VITE_YOCO_PUBLIC_KEY': JSON.stringify('pk_test_6c3db1b3M4V8OVga7ad4'),
  },
})
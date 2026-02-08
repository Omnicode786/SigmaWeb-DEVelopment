import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Kabhi kabhi relative paths ka masla hota hai, ye use fix karega
      'three-stdlib': 'three-stdlib'
    }
  },
  optimizeDeps: {
    // Ye sari libraries pre-bundle hongi taake resolve error na aaye
    include: ['three', '@react-three/fiber', '@react-three/drei', 'three-stdlib'],
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 1. GitHub Pages 경로 설정 (반드시 유지)
  base: '/art-studio-final/', 
  build: {
    // 2. 빌드 결과 폴더명을 'build'로 설정
    outDir: 'build', 
  },
})
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist', // ✅ keeps dist/ inside s3-uploader-vanilla
  },
})
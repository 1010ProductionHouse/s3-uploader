import { defineConfig } from 'vite'
import { resolve } from 'path' // This might already be there or not needed depending on your setup

export default defineConfig({
  // The base path for your application. This is crucial for GitHub Pages.
  // It should be your repository name surrounded by slashes.
  base: '/s3-uploader/', // <--- ADD OR UPDATE THIS LINE

  build: {
    outDir: 'dist', // Ensures output goes to 'dist'
    rollupOptions: {
      // If you have multiple entry points or need specific configuration,
      // it would go here. For a simple app, this might not be strictly needed.
      input: {
        main: resolve(__dirname, 'index.html')
        // You might also have specific entry points for JS/TS if not handled by index.html directly
      }
    }
  },
  // You might have other configurations here (e.g., plugins, server)
})

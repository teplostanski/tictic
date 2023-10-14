import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'tictic',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
      outDir: 'dist',
      types: false,
    },
  },
})

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      //entry: {
      //  fn1: 'src/lib/fn1.ts',
      //  fn2: 'src/lib/fn2.ts',
      //  common: ['src/lib/fn1.ts', 'src/lib/fn2.ts'], // Общий файл для всех функций
      //},
      entry: 'src/index.ts',
      name: 'tictic',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        format: 'umd',
        //exports: 'named',
        //sourcemap: true,
      },
    },
  },
})

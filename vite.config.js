import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts', // Ваш входной файл
      name: 'tictic', // Имя вашей библиотеки
      fileName: (format) => `index.${format}.js`, // Формат имени выходных файлов
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Дополнительные опции Rollup
    },
  },
  plugins: [
    // Добавляем плагин для генерации файла .d.ts
    dts(),
  ],
})

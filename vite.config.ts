import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      include: ['./src/index.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PapuddingLayout',
      formats: ['es'],
      fileName: 'papudding-layout',
      cssFileName: 'style', // 确保CSS文件名为style.css
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'vuex'],
      output: {
        globals: {
          vue: 'vue',
          'vue-router': 'vue-router',
          vuex: 'vuex'
        },
      },
    },
    cssCodeSplit: false, // 合并所有CSS到一个文件
  },
});
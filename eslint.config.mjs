import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'vue/no-mutating-props': 'off',
      'vue/multi-word-component-names': 'off',
      indent: ['error', 2],
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  },
  globalIgnores([
    'dist/*',
    'node_modules/*',
    'vite.config.ts'
  ])
])

import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import tailwindCssPlugin from 'eslint-plugin-tailwindcss';
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  ...tailwindCssPlugin.configs['flat/recommended'],
  sonarjs.configs.recommended,
  skipFormatting,

  {
    ignores: [
      'node_modules/*',
      'firebase-debug.log*',
      '.firebase',
      'dist',
    ],
  },

  {
    rules: {
      'vue/comment-directive': ['off'],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      'no-console': [
        'error',
        {
          allow: ['error'],
        },
      ],
      'vue/no-v-html': 'off',
      'vue/no-multiple-template-root': 'off',
      camelcase: 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      'computed-property-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-before-function-paren': 'off',
      'arrow-parens': ['error', 'always'],
      'vue/multi-word-component-names': ['warn'],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
          multiline: 'below',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'never',
        },
      ],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: 'always',
          ObjectPattern: {
            multiline: true,
            minProperties: 2,
          },
          ImportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
          ExportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
        },
      ],
      'object-property-newline': ['error'],
      'prefer-destructuring': ['error'],
      'vue/html-indent': ['error'],
      'vue/html-self-closing': ['error'],
      '@typescript-eslint/prefer-ts-expect-error': ['warn'],
      'sonarjs/no-duplicate-string': ['off'],
      'sonarjs/cognitive-complexity': ['warn'],
      'sonarjs/no-nested-assignment': ['warn'],
      'sonarjs/no-unused-vars': ['error'],
      'sonarjs/redundant-type-aliases': ['error'],
      'sonarjs/no-nested-functions': ['warn'],
      'sonarjs/no-nested-conditional': ['warn'],
    },
  },
];

const path = require('path');

module.exports = {
    root: true,
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['~', path.resolve(__dirname, './src')]],
                extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
            },
        },
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'es5',
                tabWidth: 4,
                semi: true,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: false,
                bracketSpacing: true,
                arrowParens: 'always',
                endOfLine: 'auto',
            },
        ],
        'no-console': 'off',
    },
};

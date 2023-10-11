module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
    rules: {
        'linebreak-style': 0,
        'object-curly-newline': 0,
        'no-console': 0,
        'no-restricted-syntax': 0,
        'no-plusplus': 0,
        'implicit-arrow-linebreak': 0,
        'function-paren-newline': 0,
        indent: ['error', 4],
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 12,
    },
};

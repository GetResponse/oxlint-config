import { defineConfig } from 'oxlint';

export default defineConfig({
    rules: {
        'no-shadow': ['warn', { ignoreOnInitialization: true }],
        'no-shadow-restricted-names': 'error',
        'no-undef': 'warn',
        'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    },
});

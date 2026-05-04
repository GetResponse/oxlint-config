import { defineConfig } from 'oxlint';

export default defineConfig({
    overrides: [{
        files: [
            '**/*.test.{ts,tsx,js,jsx,mts,mjs,cts,cjs}',
            '**/*.spec.{ts,tsx,js,jsx,mts,mjs,cts,cjs}',
            '**/__mocks__/**/*.{ts,tsx,js,jsx,mts,mjs,cts,cjs}',
            '**/__tests__/**/*.{ts,tsx,js,jsx,mts,mjs,cts,cjs}',
        ],
        plugins: ['jest'],
        env: { jest: true },
        rules: {
            'jest/consistent-test-it': [
                'error',
                {
                    fn: 'test',
                    withinDescribe: 'it',
                },
            ],
            'jest/prefer-lowercase-title': [
                'warn',
                {
                    ignore: ['describe'],
                },
            ],
            'jest/no-commented-out-tests': 'error',
            'jest/no-conditional-expect': 'warn',
            'jest/no-disabled-tests': 'warn',
            'jest/no-duplicate-hooks': 'error',
            'jest/no-export': 'error',
            'jest/no-focused-tests': 'warn',
            'jest/no-identical-title': 'error',
            'jest/no-jasmine-globals': 'error',
            'jest/no-mocks-import': 'error',
            'jest/no-restricted-matchers': [
                'warn',
                {
                    toBeTruthy: 'Avoid `toBeTruthy`',
                    toBeFalsy: 'Avoid `toBeFalsy`',
                },
            ],
            'jest/no-standalone-expect': 'error',
            'jest/no-test-prefixes': 'warn',
            'jest/prefer-hooks-on-top': 'warn',
            'jest/prefer-to-be': 'warn',
            'jest/prefer-to-contain': 'warn',
            'jest/prefer-to-have-length': 'warn',
            'jest/prefer-todo': 'warn',
            'jest/require-top-level-describe': 'warn',
            'jest/valid-describe-callback': 'error',
            'jest/valid-expect': 'error',
            'jest/valid-expect-in-promise': 'error',
            'jest/valid-title': 'warn',
        },
    }],
});

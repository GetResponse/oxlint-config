import { defineConfig } from 'oxlint';

export default defineConfig({
    jsPlugins: ['@stylistic/eslint-plugin'],
    rules: {
        'arrow-body-style': ['warn', 'as-needed'],
        '@stylistic/arrow-spacing': 'warn',
        'constructor-super': 'error',
        'no-class-assign': 'error',
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-this-before-super': 'error',
        'no-useless-constructor': 'warn',
        'no-useless-rename': 'warn',
        'object-shorthand': ['warn', 'always', {
            avoidQuotes: true,
            ignoreConstructors: true,
            avoidExplicitReturnArrows: true,
        }],
        'prefer-const': 'warn',
        'prefer-destructuring': [
            'warn',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
            },
        ],
        'prefer-rest-params': 'warn',
        'prefer-spread': 'warn',
        'prefer-template': 'warn',
        '@stylistic/rest-spread-spacing': 'warn',
        '@stylistic/template-curly-spacing': 'warn',
        'prefer-object-has-own': 'warn',
    },
});

import { defineConfig, type OxlintConfig } from 'oxlint';
import { buildDynamicConfig } from './dynamic-config/buildDynamicConfig.js';
import bestPractices from './rules/best-practices.js';
import errors from './rules/errors.js';
import es6 from './rules/es6.js';
import style from './rules/style.js';
import variables from './rules/variables.js';
import jest from './rules/jest.js';
import typescript from './rules/typescript.js';
import react from './rules/react.js';
import playwright from './rules/playwright.js';

const dynamicConfig = buildDynamicConfig();

const hasJest = dynamicConfig.jest !== null || dynamicConfig.shouldIncludeAll;
const hasReact = dynamicConfig.react !== null || dynamicConfig.shouldIncludeAll;
const hasPlaywright = dynamicConfig.playwright !== null || dynamicConfig.shouldIncludeAll;
const hasTypescript = dynamicConfig.typescript !== null || dynamicConfig.shouldIncludeAll;

const base = {
    env: {
        builtin: true,
        es2022: true,
        browser: true,
        node: true,
        ...(dynamicConfig.esm ? {} : { commonjs: true }),
    },
    globals: {
        JSX: 'readonly',
        globalThis: 'writable',
    },
} satisfies OxlintConfig;

export default defineConfig({
    ...base,
    categories: { correctness: 'off' },
    options: { typeAware: hasTypescript },
    extends: [
        bestPractices,
        errors,
        es6,
        style,
        variables,
        ...(hasJest ? [jest] : []),
        ...(hasTypescript ? [typescript] : []),
        ...(hasReact ? [react] : []),
        ...(hasPlaywright ? [playwright] : []),
    ],
    overrides: [
        // TODO: Workaround for https://github.com/oxc-project/oxc/issues/20087
        {
            files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
            ...base,
        },
    ],
});

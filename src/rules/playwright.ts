import { defineConfig } from 'oxlint';
import { getPlaywrightConfig } from '../dynamic-config/files.js';

function getFromPattern(pattern: RegExp, cfg: string | null): string | string[] | null {
    if (!cfg) { return null; }
    const match = cfg.match(pattern);

    if (!match || match.length < 2) { return null; }
    const value = match[1];

    if (value.startsWith('/')) {
        return null;
    }

    if (value.startsWith('\'') || value.startsWith('"')) {
        return value.slice(1, -1);
    }

    if (value.startsWith('[')) {
        return value
            .slice(1, -1)
            .split(',')
            .map((el) => el.trim())
            .filter((el) => !el.startsWith('/') && !el.endsWith('/'))
            .map((el) => el.replace(/^['"]|['"]$/g, ''));
    }

    return null;
}

function getDir(cfg: string | null): string {
    return cfg?.match(/testDir:\s*['"]([^'"]+)['"]/m)?.[1] ?? 'e2e';
}

function getMatchPattern(cfg: string | null): string | string[] {
    return getFromPattern(/testMatch:\s*(\/.*\/[gimsuy]*|['"][^'"]+['"]|\[[^\]]+])/m, cfg) ?? '**/*.@(spec|test).?(c|m)[jt]s?(x)';
}

function getIgnorePattern(cfg: string | null): string | string[] {
    return getFromPattern(/testIgnore:\s*(\/.*\/[gimsuy]*|['"][^'"]+['"]|\[[^\]]+])/m, cfg) ?? '**/test-assets/**';
}

function getIncludeFiles(): string[] {
    const playwrightConfig = getPlaywrightConfig();
    const dir = getDir(playwrightConfig);
    const files = getMatchPattern(playwrightConfig);

    return (Array.isArray(files) ? files : [files]).map((f) => `${dir.endsWith('/') ? dir : `${dir}/`}${f}`);
}

function getExcludedFiles(): string[] {
    const files = getIgnorePattern(getPlaywrightConfig());
    return Array.isArray(files) ? files : [files];
}

export default defineConfig({
    ignorePatterns: getExcludedFiles(),
    overrides: [{
        files: getIncludeFiles(),
        jsPlugins: ['eslint-plugin-playwright'],
        rules: {
            'playwright/max-nested-describe': ['error', { max: 2 }],
            'playwright/missing-playwright-await': 'error',
            'playwright/no-conditional-expect': 'warn',
            'playwright/no-duplicate-hooks': 'warn',
            'playwright/no-element-handle': 'error',
            'playwright/no-eval': 'error',
            'playwright/no-focused-test': 'warn',
            'playwright/no-force-option': 'warn',
            'playwright/no-get-by-title': 'warn',
            'playwright/no-nested-step': 'warn',
            'playwright/no-networkidle': 'warn',
            'playwright/no-page-pause': 'error',
            'playwright/no-standalone-expect': 'error',
            'playwright/no-unsafe-references': 'warn',
            'playwright/no-useless-await': 'error',
            'playwright/no-useless-not': 'warn',
            'playwright/no-wait-for-selector': 'warn',
            'playwright/no-wait-for-timeout': 'error',
            'playwright/prefer-hooks-on-top': 'warn',
            'playwright/prefer-strict-equal': 'warn',
            'playwright/prefer-to-contain': 'warn',
            'playwright/prefer-to-have-count': 'warn',
            'playwright/prefer-to-have-length': 'warn',
            'playwright/prefer-web-first-assertions': 'error',
            'playwright/valid-describe-callback': 'error',
            'playwright/valid-expect-in-promise': 'error',
            'playwright/valid-expect': 'warn',
        },
    }],
});

import { readFileSync } from 'fs';
import { lookupFile } from './lookupFile.js';
import { once } from './once.js';

const cwd = process.cwd();

export const getPackageJson = once((): Record<string, unknown> | null => {
    const pjsonPath = lookupFile(cwd, 'package.json');
    return pjsonPath ? (JSON.parse(readFileSync(pjsonPath, 'utf-8')) as Record<string, unknown>) : null;
});

export const getPlaywrightConfig = once((): string | null => {
    const found = lookupFile(cwd, 'playwright.config.ts', 'playwright.config.js', 'playwright.config.mts', 'playwright.config.mjs');
    return found ? readFileSync(found, 'utf-8') : null;
});

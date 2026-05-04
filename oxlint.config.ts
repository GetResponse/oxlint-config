import { defineConfig } from 'oxlint';
import config from '@getresponse/oxlint-config';

export default defineConfig({
    ignorePatterns: ['oxlint.config.ts'],
    extends: [config],
});

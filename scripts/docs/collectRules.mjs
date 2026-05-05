import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const RULE_DOC_BASE = 'https://oxc.rs/docs/guide/usage/linter/rules/';

const sourceFromName = (name) => {
    const slash = name.indexOf('/');
    return slash === -1 ? 'eslint' : name.slice(0, slash);
};

const ruleUrl = (name) => {
    const slash = name.indexOf('/');
    if (slash === -1) {
        return `${RULE_DOC_BASE}eslint/${name}.html`;
    }
    return `${RULE_DOC_BASE}${name.slice(0, slash)}/${name.slice(slash + 1)}.html`;
};

function walkConfig(config, scope = '*', acc = []) {
    if (config.rules) {
        for (const [name, entry] of Object.entries(config.rules)) {
            acc.push({ name, entry, scope });
        }
    }
    for (const o of config.overrides ?? []) {
        const ovScope = (o.files ?? []).join(', ') || '*';
        walkConfig(o, ovScope, acc);
    }
    for (const e of config.extends ?? []) {
        walkConfig(e, scope, acc);
    }
    return acc;
}

export async function collectRules(repoRoot) {
    const mainUrl = pathToFileURL(join(repoRoot, 'dist', 'index.js')).href;
    const a11yUrl = pathToFileURL(join(repoRoot, 'dist', 'mixins', 'a11y.js')).href;

    const main = (await import(mainUrl)).default;
    const a11y = (await import(a11yUrl)).default;

    const ruleEntries = [
        ...walkConfig(main),
        ...walkConfig(a11y, '*'),
    ];

    return { ruleEntries, sourceFromName, ruleUrl };
}

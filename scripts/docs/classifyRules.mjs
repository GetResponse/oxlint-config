const isOff = (entry) => {
    const level = Array.isArray(entry) ? entry[0] : entry;
    return level === 0 || level === 'off' || level === 'allow';
};

const ruleStatus = (entry) => {
    const level = Array.isArray(entry) ? entry[0] : entry;
    if (level === 1 || level === 'warn') {
        return 'warn';
    }
    if (level === 2 || level === 'error' || level === 'deny') {
        return 'error';
    }
    return 'off';
};

export function classifyRules({ ruleEntries, sourceFromName, ruleUrl }) {
    const seen = new Map();

    for (const { name, entry, scope } of ruleEntries) {
        if (isOff(entry)) {
            seen.delete(name);
            continue;
        }
        const status = ruleStatus(entry);
        const options = Array.isArray(entry) ? entry.slice(1) : [];
        seen.set(name, {
            name,
            status,
            options,
            scope,
            source: sourceFromName(name),
            url: ruleUrl(name),
        });
    }

    const enabled = [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
    return { enabled };
}

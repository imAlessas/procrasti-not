// Simple sliding-window limiter, kept in memory (per server instance).
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

    if (recent.length >= limit) {
        hits.set(key, recent);
        return true;
    }

    recent.push(now);
    hits.set(key, recent);

    if (hits.size > 1000)
        for (const [k, times] of hits)
            if (times.every((time) => now - time >= windowMs)) hits.delete(k);

    return false;
}

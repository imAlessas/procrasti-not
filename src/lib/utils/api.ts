// Thin JSON client for the app API; throws an Error carrying the server message on failure.
export async function api<T = unknown>(method: string, url: string, body?: unknown): Promise<T> {
    let response: Response;
    try {
        response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch {
        throw new Error('Network error, please try again');
    }

    if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? `Request failed (${response.status})`);
    }

    return (response.status === 204 ? undefined : await response.json()) as T;
}

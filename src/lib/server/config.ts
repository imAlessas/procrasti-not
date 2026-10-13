import { env } from '$env/dynamic/private';

// Absolute URL on the configured application origin (BASE_URL may or may not end with a slash).
export function appUrl(path: string, fallbackOrigin: string): string {
    return new URL(path, env.BASE_URL || fallbackOrigin).toString();
}

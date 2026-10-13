import { THEME_COOKIE } from './const';

export enum Theme {
    light = 'light',
    alpine = 'alpine',
    dark = 'dark',
    cyberpunk = 'cyberpunk',
}

export const THEMES: Theme[] = Object.values(Theme);
export const DEFAULT_THEME = Theme.dark;

export function isTheme(value: unknown): value is Theme {
    return typeof value === 'string' && (THEMES as string[]).includes(value);
}

export function updateThemeCookie(theme: string): void {
    document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

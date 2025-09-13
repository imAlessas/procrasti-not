import { THEME_COOKIE } from "./const";

export enum Theme {
    light = "light",
    alpine = "alpine",
    dark = "dark",
    cyberpunk = "cyberpunk"
}



export function retrieveTheme(): Theme {

    const themeFromCookie = retrieveThemeFromCookie();
    if (themeFromCookie !== null)
        return themeFromCookie;

    // Fallback to system preference if cookie is not available
    if (typeof window !== 'undefined' && window.matchMedia)
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;
    
    // Fallback default on server
    return Theme.dark;
}



export function updateThemeCookie(theme: string) : void {
    document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}



function retrieveThemeFromCookie() : Theme | null {

    const getThemeCookie = () : string | null => {
        if (typeof document === 'undefined')
            return null;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${THEME_COOKIE}=`);
        if (parts.length === 2)
            return parts.pop()!.split(';').shift() || null;

        return null;
    }

    const theme = getThemeCookie();
    if (theme === null || !(theme in Theme)) 
        return null;

    return theme as Theme;

}

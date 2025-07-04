
export const RANDOM_TODO_URL: string = 'https://dummyjson.com/todos/random/1';

export const ICONS: Record<string, string> = {
    add : "tabler:square-rounded-plus",
    close : "tabler:square-rounded-x",
    dice : "tabler:dice-5",
    check : "tabler:check",
    bin : "tabler:trash",
    in : "tabler:door-enter",
    out : "tabler:door-exit",

    // Themes
    moon : "tabler:moon-filled",
    sun : "tabler:sun-filled",
    city: "tabler:building-skyscraper",
    mountain: "tabler:mountain",
};

export function retrieveSystemTheme(): 'dark' | 'light' {
  if (typeof window !== 'undefined' && window.matchMedia)
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  return 'dark'; // fallback default on server
}

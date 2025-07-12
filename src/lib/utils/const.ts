
export const RANDOM_TODO_URL: string = 'https://dummyjson.com/todos/random/1';

export const ICONS: Record<string, string> = {
    add : "mingcute:add-fill",
    close : "mingcute:close-fill",
    dice : "tabler:dice-5",
    check : "mingcute:check-fill",
    bin : "tabler:trash",
    sparkle : "mingcute:sparkles-fill",
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

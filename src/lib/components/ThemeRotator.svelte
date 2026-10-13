<script lang="ts">
    import { onMount } from "svelte";
    import IconButton from "./generics/IconButton.svelte";
    import { api } from "$lib/utils/api";
    import { ICONS } from "$lib/utils/const";
    import { Theme, THEMES, isTheme, updateThemeCookie } from "$lib/utils/theme";
    import type { UserDTO } from "$lib/types";

    let {
        loggedUser,
        initialTheme,
        hasThemePreference,
    }: {
        loggedUser: UserDTO | null;
        initialTheme: string;
        hasThemePreference: boolean;
    } = $props();

    const THEME_ICONS: Record<Theme, string> = {
        [Theme.light]: ICONS.sun,
        [Theme.alpine]: ICONS.mountain,
        [Theme.dark]: ICONS.moon,
        [Theme.cyberpunk]: ICONS.city,
    };

    // svelte-ignore state_referenced_locally
    let theme = $state<Theme>(isTheme(initialTheme) ? initialTheme : Theme.dark);

    function applyTheme(newTheme: Theme) {
        document.body.classList.remove(...THEMES);
        document.body.classList.add(newTheme);
        updateThemeCookie(newTheme);
    }

    onMount(() => {
        // First visit without any saved preference: follow the system color scheme
        if (!hasThemePreference && window.matchMedia?.("(prefers-color-scheme: light)").matches)
            theme = Theme.light;

        applyTheme(theme);
    });

    // Infinitely rotates the theme list
    async function rotateTheme() {
        theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
        applyTheme(theme);

        if (loggedUser)
            await api("PUT", "/api/users/theme", { theme }).catch((error) =>
                console.error("Could not save the theme:", error.message)
            );
    }
</script>

<div class="theme-button">
    <IconButton icon={THEME_ICONS[theme]} label="Change theme (current: {theme})" onClick={rotateTheme} />
</div>

<style lang="scss">
    .theme-button {
        position: absolute;
        top: 2.5%;
        left: 2%;
    }
</style>

<script lang="ts">
    import '$lib/styles/style.scss';
    import { theme } from '$lib/store/theme';
    import { onMount } from 'svelte';
    import IconButton from './IconButton.svelte';
    import { ICONS } from '$lib/utils/const';
    import type { DatabaseUser } from '$lib/database/interfaces';
    import { Theme, updateThemeCookie } from '$lib/utils/theme';

    export let loggedUser: DatabaseUser | undefined;
    export let currentTheme: string;


    const THEMES_MAP: Record<Theme, string> = {
        [Theme.light] : ICONS.sun,
        [Theme.alpine] : ICONS.mountain,
        [Theme.dark] : ICONS.moon,
        [Theme.cyberpunk] : ICONS.city,
    }

    const THEMES: string[] = Object.keys(THEMES_MAP);

    $: theme.set(currentTheme as Theme);
    let index = THEMES.indexOf($theme);

    onMount(() => {
        index = THEMES.indexOf($theme);
        refreshTheme();
    });


    // Infinitely rotates the theme list
    async function rotateTheme() {
        index = (index + 1) % THEMES.length;
        const newTheme = THEMES[index];
        theme.set(newTheme as Theme);
        refreshTheme();

        updateThemeCookie(newTheme);

        if (loggedUser)
            await fetch(`/api/users/theme`, {
                method: 'PUT',
                body: JSON.stringify({
                    userID: loggedUser._id.toString(),
                    theme: newTheme
                }),
            });

    }

    // Removes the themes and sets the new one
    function refreshTheme() {
        document.body.classList.remove(...THEMES);
        document.body.classList.add($theme);
        
        updateThemeCookie($theme);

        console.debug("Switching to theme:", $theme);
    }


</script>



<div class="theme-button">
    <IconButton icon={THEMES_MAP[$theme]} onClick={rotateTheme}/>
</div>



<style lang="scss">
    .theme-button {
        position: absolute;
        top:2.5%;
        left: 2%;
    }
</style>

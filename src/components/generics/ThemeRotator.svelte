<script lang="ts">
    import '$lib/styles/style.scss';
    import { theme } from '$lib/store/theme';
    import { onMount } from 'svelte';
    import IconButton from './IconButton.svelte';
    import { ICONS } from '$lib/utils/const';
    import type { DatabaseUser } from '$lib/database/interfaces';

    export let loggedUser: DatabaseUser | undefined;
    export let currentTheme: string;


    const THEMES_MAP: Record<string, string> = {
        "light" : ICONS["sun"],
        "alpine" : ICONS["mountain"],
        "dark" : ICONS["moon"],
        "cyberpunk" : ICONS["city"],
    }

    const THEMES: string[] = Object.keys(THEMES_MAP);

    $: theme.set(currentTheme);
    let index = THEMES.indexOf($theme);

    onMount(() => {
        index = THEMES.indexOf($theme);
        refreshTheme();
    });


    // Infinitely rotates the theme list
    async function rotateTheme() {
        index = (index + 1) % THEMES.length;
        const newTheme = THEMES[index];
        theme.set(newTheme);
        refreshTheme();

        if (loggedUser)
            await fetch(`/api/users/${loggedUser._id}`, {
                method: 'PUT',
                body: JSON.stringify({ theme: newTheme }),
            });

    }

    // Removes the themes and sets the new one
    function refreshTheme() {
        document.body.classList.remove(...THEMES);
        document.body.classList.add($theme);
        console.debug("Switching to theme:", $theme);
    }


</script>


<div style="position: absolute; top:30px; left: 50px">
    <IconButton icon={THEMES_MAP[$theme]} onClick={rotateTheme}/>
</div>

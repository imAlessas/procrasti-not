<script lang="ts">
    import '$lib/styles/style.scss';
    import { theme } from '$lib/store/theme';
    import { onMount } from 'svelte';
    import IconButton from './IconButton.svelte';
    import { ICONS } from '$lib/utils/const';

    const THEMES_MAP: Record<string, string> = {
        "dark" : ICONS["moon"],
        "light" : ICONS["sun"],
    }

    const THEMES: string[] = Object.keys(THEMES_MAP);
    let index = THEMES.indexOf($theme);

    onMount(() => {
        refreshTheme()
    });


    // Infinitely rotates the theme list
    function rotateTheme() {
        index = (index + 1) % THEMES.length;
        $theme = THEMES[index];
        refreshTheme();
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

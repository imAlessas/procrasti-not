<script lang="ts">
    import '$lib/styles/style.scss';
    import { theme } from '$lib/store/theme';
    import { onMount } from 'svelte';
    import Icon from './Icon.svelte';
    import PrimaryButton from './PrimaryButton.svelte';
    import IconButton from './IconButton.svelte';

    const THEMES_MAP: Record<string, string> = {
        "dark" : "akar-icons:moon-fill",
        "light" : "akar-icons:sun-fill",
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
        refreshTheme()
    }

    // Removes the themes and sets the new one
    function refreshTheme() {
        document.body.classList.remove(...THEMES);
        document.body.classList.add($theme)
    }

</script>


<div style="position: absolute; top:10px; left: 20px">
    <IconButton icon={THEMES_MAP[$theme]} onClick={rotateTheme}/>
</div>

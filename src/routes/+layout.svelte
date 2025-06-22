<script>
    import '$lib/styles/style.scss';
    import { theme } from '$lib/store/theme';
    import { onMount } from 'svelte';

    onMount(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add($theme);
    });

    function handleChange() {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add($theme)
    }

</script>

<select id="theme-select" bind:value={$theme} on:change={handleChange}>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</select>

<slot />

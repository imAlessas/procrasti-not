<script lang="ts">
    import '$lib/styles/style.scss';
    import ThemeRotator from '$lib/components/ThemeRotator.svelte';

    let { data, children } = $props();
</script>

<main>
    <ThemeRotator
        loggedUser={data.loggedUser}
        initialTheme={data.theme}
        hasThemePreference={data.hasThemePreference}
    />
    {@render children()}
</main>

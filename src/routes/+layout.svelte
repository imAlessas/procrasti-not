<script lang="ts">
    import { retrieveTheme } from "$lib/utils/theme";
    import ThemeRotator from "../components/generics/ThemeRotator.svelte";
    import type { DatabaseUser } from "$lib/database/interfaces";
    
    export let data;

    const loggedUser: DatabaseUser | undefined = data.loggedUser;
    const currentTheme: string = loggedUser?.theme ?? retrieveTheme();
</script>



<main>
    <ThemeRotator {loggedUser} {currentTheme} />
    <slot />
</main>



<style lang="scss">
   @use '$lib/styles/style.scss' as *;
</style> 

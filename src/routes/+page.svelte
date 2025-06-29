<style lang="scss">
   @use '$lib/styles/style.scss' as *;
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { ICONS } from '$lib/utils/const.js';
    import IconButton from '../components/generics/IconButton.svelte';

    export let data;

    onMount( async () => {
        if(data.loggedUser)
            goto("/list")
    });

</script>


<form method="POST" action="?/signIn" class="signin-form">
    <IconButton icon={ICONS["in"]} text="Sign in"/>
</form>

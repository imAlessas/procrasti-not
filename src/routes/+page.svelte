<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;

    onMount( () => {
        if(data.user) goto("/list");
    });

</script>

<form method="POST" action="?/{data.user ? 'signOut' : 'signIn'}">
    <button type="submit">Sign {data.user ? 'out' : 'in'}</button>
</form>


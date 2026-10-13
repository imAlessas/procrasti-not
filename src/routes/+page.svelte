<script lang="ts">
    import { ICONS } from '$lib/utils/const';
    import IconButton from '$lib/components/generics/IconButton.svelte';
</script>

<form method="POST" action="?/signIn" class="signin-form">
    <IconButton icon={ICONS.in} text="Sign in" type="submit" />
</form>

<style lang="scss">
    .signin-form {
        margin: auto;
    }
</style>

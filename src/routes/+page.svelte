<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let data;

    onMount(() => {

        const authUser = data?.user

        if (!authUser)
            return;

        



        goto('/list'); 

    });

</script>

<form method="POST" action="?/signIn" class="signin-form">
    <button type="submit" class="signin-button non-selectable">Sign in</button>
</form>

<style>
    :global(body) {
        background: linear-gradient(135deg, #ffcb6b, #FCFCFC, #ADD8E6);
        background-size: 150% 150%;
        animation: waveAnimation 15s ease-in-out infinite;
        font-family: 'Futura', sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

    @keyframes waveAnimation {
        0% { background-position: 0% 50%; }
        25% { background-position: 50% 100%; }
        50% { background-position: 100% 50%; }
        75% { background-position: 50% 0%; }
        100% { background-position: 0% 50%; }
      }

    .signin-form {
        position: absolute;
        margin: auto;
        z-index: 10;
    }

    .signin-button {
        background: linear-gradient(135deg, #FFA500, #ADD8E6);
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-family: 'Futura', sans-serif;
        font-size: 16px;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: background 0.3s ease, transform 0.2s ease;
    }

    .signin-button:hover {
        background: linear-gradient(135deg, #FF8C00, #87CEEB);
        transform: scale(105%);
    }

    .signin-button:active {
        transform: scale(95%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

</style>

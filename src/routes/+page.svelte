<script lang=ts>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import type { UserInfoResponse } from '@logto/sveltekit';
    import { LOGGED_USER_SESSION } from '$lib/utils/const.js';
    import type { DatabaseUser } from '$lib/database/interfaces.js';

    export let data;


    // Queries the MongDB to find a user with userId
    // Returns true or false based on the result
    async function findUser(logtoId:string) : Promise<boolean> {
        
        const response = await fetch(`/api/users/${logtoId}`, {method: 'GET'});
        const json = await response.json();

        if (json.error) {
            console.debug(json.error);
            return false;
        }

        const user : DatabaseUser = json;
        console.debug('User found!');

        // Save user to store
        sessionStorage.setItem(LOGGED_USER_SESSION, JSON.stringify(user));

        goto('/list');
        return true;

    }


    // Creates a new user, based on the Logto information
    async function addUser(newUser:UserInfoResponse) : Promise<void> {
        
        const response = await fetch(`/api/users/${newUser.sub}`, {
            method: 'POST',
            body:JSON.stringify({newUser})
        });
        const user : DatabaseUser = await response.json();
        console.debug(`User created!`);

        // Save user to store
        sessionStorage.setItem(LOGGED_USER_SESSION, JSON.stringify(user));
        
        goto('/list'); 

    }





    onMount( async () => {

        // Retrieve Logto information
        const authUser = data?.authUser;
        if (!authUser)
            return;
    
        // User found, return
        if (await findUser(authUser.sub))
            return;
        
        // No user? Create one
        addUser(authUser);

    });

</script>



<form method="POST" action="?/signIn" class="signin-form">
    <button type="submit" class="signin-button non-selectable">Sign in</button>
</form>


<form method="POST" action="?/signOut" class="signin-form">
    <button type="submit" class="signin-button non-selectable">Sign out</button>
</form>






<style>
    :global(body) {
        /* background: linear-gradient(135deg, #ffcb6b, #FCFCFC, #ADD8E6); */
        background: linear-gradient(135deg, #b3862f, #2c2c2c, #3b5e7a);
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
        /* position: absolute; */
        margin: auto;
        z-index: 10;
    }

    .signin-button {
        /* background: linear-gradient(135deg, #FFA500, #ADD8E6); */
        background: linear-gradient(135deg, #b36b00, #3a5a7c);
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
        /* background: linear-gradient(135deg, #FF8C00, #87CEEB); */
        background: linear-gradient(135deg, #b35f00, #4a7ca3);
        transform: scale(105%);
    }

    .signin-button:active {
        transform: scale(95%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import type { UserInfoResponse } from '@logto/sveltekit';
    import { LOGGED_USER_SESSION } from '$lib/utils/const.js';
    import type { DatabaseUser } from '$lib/database/interfaces.js';
    import PrimaryButton from '../components/generics/PrimaryButton.svelte';

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

        document.body.classList.add('light');

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

<style lang="scss">
   @use '$lib/styles/style.scss' as *;
</style>


<form method="POST" action="?/signIn" class="signin-form">
    <PrimaryButton>
        Sign in
    </PrimaryButton>
</form>

<form method="POST" action="?/signOut" class="signin-form">
    <PrimaryButton>
        Sign out
    </PrimaryButton>
</form>

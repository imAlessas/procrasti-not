import type { DatabaseUser } from '$lib/database/interfaces';
import type { UserInfoResponse } from '@logto/sveltekit';
import type { LayoutServerLoad } from './$types';


// Server load function to provide the logged-in user data to all pages
export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    return {
        loggedUser: await findOrCreateUser(fetch, locals.user)
    };
};



//Finds an existing user or creates a new one if not found.
async function findOrCreateUser(fetch: typeof globalThis.fetch, authUser: UserInfoResponse | undefined): Promise<DatabaseUser | undefined> {
    if (!authUser) return undefined;

    const existingUser = await getUserByLogtoId(fetch, authUser.sub);
    if (existingUser)
        return existingUser;

    return await createUser(fetch, authUser);
}



// Fetches a user from the database by their Logto user ID.
async function getUserByLogtoId(fetch: typeof globalThis.fetch, logtoUserId: string): Promise<DatabaseUser | undefined> {
    const response = await fetch(`/api/users/find`, {
        method: 'POST' ,
        body:JSON.stringify({
            logtoID: logtoUserId
        })
    });
    const data = await response.json();

    if (data.error) {
        console.error('Error fetching user:', data.error);
        return undefined;
    }

    console.debug('User found in database.');
    return data as DatabaseUser;
}



// Creates a new user in the database based on Logto user info.
async function createUser(fetch: typeof globalThis.fetch, logtoUser: UserInfoResponse): Promise<DatabaseUser | undefined> {
    const response = await fetch(`/api/users/create`, {
        method: 'POST',
        body: JSON.stringify({
            newUser: logtoUser
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    if (data.error) {
        console.error('Error creating user:', data.error);
        return undefined;
    }

    console.debug('User created in database.');
    return data as DatabaseUser;
}

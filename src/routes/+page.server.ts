import { BASE_URL } from '$env/static/private';
import type { Actions } from './$types';
import { Users } from '$lib/models/Users';
import type { PageServerLoad } from './$types';
import { connectToMongoDB } from '$lib/database/mongoose';


export const actions: Actions = {
    signIn: async ({ locals }) => {
        await locals.logtoClient.signIn(`${BASE_URL}callback`);
    },
    signOut: async ({ locals }) => {
        await locals.logtoClient.signOut((`${BASE_URL}`));
    },
};

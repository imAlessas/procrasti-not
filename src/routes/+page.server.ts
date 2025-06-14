import { BASE_URL } from '$env/static/private';
import { LOGGED_USER_SESSION } from '$lib/utils/const';
import type { Actions } from './$types';


export const actions: Actions = {
    signIn: async ({ locals }) => {
        await locals.logtoClient.signIn(`${BASE_URL}callback`);
    },
    signOut: async ({ locals }) => {
        sessionStorage.removeItem(LOGGED_USER_SESSION);     // Remove logged user from session
        await locals.logtoClient.signOut((`${BASE_URL}`));
    },
};

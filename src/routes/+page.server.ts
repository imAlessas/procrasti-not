import { BASE_URL } from '$env/static/private';
import type { Actions } from './$types';


export const actions: Actions = {
    signIn: async ({ locals }) => {
        await locals.logtoClient.signIn(`${BASE_URL}callback`);
    }
};

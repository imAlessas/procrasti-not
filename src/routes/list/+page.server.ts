import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

const baseURL = env.BASE_URL

export const actions: Actions = {
    signOut: async ({ locals }) => {
        await locals.logtoClient.signOut(`${baseURL}`);
    },
};

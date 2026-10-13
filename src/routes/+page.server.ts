import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { appUrl } from '$lib/server/config';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.dbUser)
        redirect(303, '/list');
};

export const actions: Actions = {
    signIn: async ({ locals, url }) => {
        await locals.logtoClient.signIn(appUrl('callback', url.origin));
    },
};

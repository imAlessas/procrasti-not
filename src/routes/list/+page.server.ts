import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { findTodos } from '$lib/server/queries';
import { appUrl } from '$lib/server/config';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.dbUser)
        redirect(303, '/');

    return { todos: await findTodos(locals.dbUser._id.toString()) };
};

export const actions: Actions = {
    signOut: async ({ locals, url }) => {
        await locals.logtoClient.signOut(appUrl('/', url.origin));
    },
};

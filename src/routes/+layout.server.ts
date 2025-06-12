import type { LayoutServerLoad } from './$types';

// Logto
export const load: LayoutServerLoad = async ({ locals }) => {
    return { authUser: locals.authUser };
};

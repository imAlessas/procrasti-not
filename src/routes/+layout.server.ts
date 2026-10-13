import type { LayoutServerLoad } from './$types';
import { toUserDTO } from '$lib/server/queries';
import { THEME_COOKIE } from '$lib/utils/const';

export const load: LayoutServerLoad = async ({ locals, cookies }) => ({
    loggedUser: locals.dbUser ? toUserDTO(locals.dbUser) : null,
    theme: locals.theme,
    // Without a stored preference the browser's color scheme is used on the client
    hasThemePreference: Boolean(locals.dbUser?.theme || cookies.get(THEME_COOKIE)),
});

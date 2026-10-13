import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { updateTheme } from '$lib/server/queries';
import { readJson, requireUser } from '$lib/server/http';
import { isTheme } from '$lib/utils/theme';

export const PUT: RequestHandler = async ({ request, locals }) => {
    const user = requireUser(locals);
    const { theme } = await readJson(request);

    if (!isTheme(theme))
        error(400, 'Property [theme] is not a valid theme');

    await updateTheme(user._id.toString(), theme);
    return json({ theme });
};

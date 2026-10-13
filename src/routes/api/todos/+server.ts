import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createTodo } from '$lib/server/queries';
import { parseText, readJson, requireUser } from '$lib/server/http';

export const POST: RequestHandler = async ({ request, locals }) => {
    const user = requireUser(locals);
    const text = parseText((await readJson(request)).text);

    try {
        return json(await createTodo(user._id.toString(), text), { status: 201 });
    } catch (e) {
        console.error('createTodo failed', e);
        error(500, 'Could not create the todo');
    }
};

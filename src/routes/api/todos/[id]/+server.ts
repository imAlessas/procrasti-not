import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteTodo, updateTodo } from '$lib/server/queries';
import { parseObjectId, parseText, readJson, requireUser } from '$lib/server/http';

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
    const user = requireUser(locals);
    const id = parseObjectId(params.id);
    const body = await readJson(request);

    const patch: { text?: string; isDone?: boolean } = {};
    if (body.text !== undefined) patch.text = parseText(body.text);
    if (body.isDone !== undefined) {
        if (typeof body.isDone !== 'boolean') error(400, 'Property [isDone] must be a boolean');
        patch.isDone = body.isDone;
    }
    if (Object.keys(patch).length === 0)
        error(400, 'Nothing to update');

    const todo = await updateTodo(user._id.toString(), id, patch);
    if (!todo) error(404, 'Todo not found');

    return json(todo);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
    const user = requireUser(locals);

    if (!(await deleteTodo(user._id.toString(), parseObjectId(params.id))))
        error(404, 'Todo not found');

    return new Response(null, { status: 204 });
};

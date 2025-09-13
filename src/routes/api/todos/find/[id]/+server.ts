import type { RequestHandler } from '@sveltejs/kit';
import { findTodos } from '$lib/database/query';
import { ObjectId } from 'mongodb';


export const GET: RequestHandler = async ({ params }) => {

    if (!params.id)
        return new Response(JSON.stringify({error: 'Property [id] is mandatory.'}), { status: 200 });

    const todos = await findTodos(new ObjectId(params.id));
    if (!todos)
        return new Response(JSON.stringify({error: 'No todos.'}), { status: 200 });

    return new Response(JSON.stringify(todos), { status: 200 });

};

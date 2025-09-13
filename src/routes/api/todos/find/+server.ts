import type { RequestHandler } from '@sveltejs/kit';
import { findTodos } from '$lib/database/query';
import { ObjectId } from 'mongodb';


export const POST: RequestHandler = async ({ request }) => {

    const data = await request.json();
    if (!data.userID)
        return new Response(JSON.stringify({ error: 'Property [userID] is mandatory.' }), { status: 200 });

    const todos = await findTodos(new ObjectId(data.userID));
    if (!todos)
        return new Response(JSON.stringify({error: 'No todos found.'}), { status: 200 });

    return new Response(JSON.stringify(todos), { status: 200 });

};

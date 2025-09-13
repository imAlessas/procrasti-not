import type { RequestHandler } from '@sveltejs/kit';
import { deleteTodo } from '$lib/database/query';
import { ObjectId } from 'mongodb';


export const DELETE: RequestHandler = async ({ request }) => {

    const data = await request.json();
    if (!data.todoID)
        return new Response(JSON.stringify({ error: 'Property [todoID] is mandatory.' }), { status: 200 });
 
    const result = await deleteTodo(new ObjectId(data.todoID))

    return new Response(JSON.stringify(result), { status: 200 });

};

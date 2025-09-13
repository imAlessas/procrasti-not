import type { RequestHandler } from '@sveltejs/kit';
import { deleteTodo } from '$lib/database/query';
import { ObjectId } from 'mongodb';


export const DELETE: RequestHandler = async ({ params }) => {
    if (!params.id)
        return new Response(JSON.stringify({ error: 'Property [id] is mandatory.' }), { status: 200 });
 
    const result = await deleteTodo(new ObjectId(params.id))

    return new Response(JSON.stringify(result), { status: 200 });

};

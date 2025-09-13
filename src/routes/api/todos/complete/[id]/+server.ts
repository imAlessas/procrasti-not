import type { RequestHandler } from '@sveltejs/kit';
import { completeTodo, uncompleteTodo } from '$lib/database/query';
import { ObjectId } from 'mongodb';



export const PUT: RequestHandler = async ({ params, request }) => {
    if (!params.id)
        return new Response(JSON.stringify({ error: 'Property [id] is mandatory.' }), { status: 200 });
 
    const complete = (await request.json()).complete;

    const result = await (
        complete 
            ? completeTodo(new ObjectId(params.id)) 
            : uncompleteTodo(new ObjectId(params.id))
    );

    return new Response(JSON.stringify(result), { status: 200 });

};

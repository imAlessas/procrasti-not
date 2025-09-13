import type { RequestHandler } from '@sveltejs/kit';
import { completeTodo, uncompleteTodo } from '$lib/database/query';
import { ObjectId } from 'mongodb';



export const PUT: RequestHandler = async ({ request }) => {

    const data = await request.json();
    if (!data.todoID)
        return new Response(JSON.stringify({ error: 'Property [todoID] is mandatory.' }), { status: 200 });
    if (!data.complete)
        return new Response(JSON.stringify({ error: 'Property [complete] is mandatory.' }), { status: 200 });

    const result = await (
        data.complete 
            ? completeTodo(new ObjectId(data.todoID)) 
            : uncompleteTodo(new ObjectId(data.todoID))
    );

    return new Response(JSON.stringify(result), { status: 200 });

};

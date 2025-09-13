import type { RequestHandler } from '@sveltejs/kit';
import { editTodo } from '$lib/database/query';
import { ObjectId } from 'mongodb';


export const PUT: RequestHandler = async ({ request }) => {
    
    const data = await request.json();
    if (!data.todoID)
        return new Response(JSON.stringify({ error: 'Property [todoID] is mandatory.' }), { status: 200 });

    if (!data.text)
        return new Response(JSON.stringify({ error: 'Property [text] is mandatory.' }), { status: 200 });

    const result = await editTodo(new ObjectId(data.todoID), data.text)

    return new Response(JSON.stringify(result), { status: 200 });
};

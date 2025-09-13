import type { RequestHandler } from '@sveltejs/kit';
import { createTodo } from '$lib/database/query';
import { ObjectId } from 'mongodb';
import type { DatabaseTodo } from '$lib/database/interfaces';


export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const newTodo : DatabaseTodo ={
        _id:        new ObjectId(),
        _idUser:    data._idUser,
        text:       data.text,
        isDone:     false,
        created:    Date.now(),
        completed:  null,
        deleted:    null,
    }

    const todo = await createTodo(newTodo);

    return new Response(JSON.stringify(todo), { status: 200 });
 
};

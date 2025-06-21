// src/routes/api/users/[id].ts
import type { RequestHandler } from '@sveltejs/kit';
import { createTodo, findTodos } from '$lib/database/query';
import { ObjectId } from 'mongodb';
import type { DatabaseTodo } from '$lib/database/interfaces';


export const GET: RequestHandler = async ({ params }) => {

    if (!params.id)
        return new Response(JSON.stringify({error: 'Property [id] is mandatory.'}), { status: 200 });

    const todos = await findTodos(new ObjectId(params.id));
    if (!todos)
        return new Response(JSON.stringify({error: 'No todos.'}), { status: 200 });

    return new Response(JSON.stringify(todos), { status: 200 });
};


export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const newTodo : DatabaseTodo ={
        _id:        new ObjectId(),
        _idUser:    data._idUser,
        text:       data.text,
        created:    Date.now(),
        isDone:     false,
        completed:  null
    }

    const todo = await createTodo(newTodo);

    return new Response(JSON.stringify(todo), { status: 200 });
 
};

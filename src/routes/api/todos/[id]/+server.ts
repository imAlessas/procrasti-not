// src/routes/api/users/[id].ts
import type { RequestHandler } from '@sveltejs/kit';
import { findTodos } from '$lib/database/query';


export const GET: RequestHandler = async ({ params }) => {

    if (!params.id)
        return new Response(JSON.stringify({error: 'Property [id] is mandatory.'}), { status: 200 });

    const todos = await findTodos(params.id);
    if (!todos)
        return new Response(JSON.stringify({error: 'No todos.'}), { status: 200 });

    return new Response(JSON.stringify(todos), { status: 200 });
};


// export const POST: RequestHandler = async ({ request }) => {
// };

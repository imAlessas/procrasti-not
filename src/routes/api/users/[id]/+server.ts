// src/routes/api/users/[id].ts
import type { RequestHandler } from '@sveltejs/kit';
import { createUser, findUserByLogtoId } from '$lib/database/query';


export const GET: RequestHandler = async ({ params }) => {

    if (!params.id)
        return new Response(JSON.stringify({error: 'Property [id] is mandatory.'}), { status: 200 });

    const user = await findUserByLogtoId(params.id);
    if (!user)
        return new Response(JSON.stringify({error: 'User not found.'}), { status: 200 });

    return new Response(JSON.stringify(user), { status: 200 });
};


export const POST: RequestHandler = async ({ request }) => {

    const data = await request.json();
    await createUser(data);

    return new Response(JSON.stringify({}), { status: 200 });

};

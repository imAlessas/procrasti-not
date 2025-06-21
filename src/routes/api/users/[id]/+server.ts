// src/routes/api/users/[id].ts
import type { RequestHandler } from '@sveltejs/kit';
import { createUser, findUserByLogtoId } from '$lib/database/query';
import { ObjectId } from 'mongodb';
import type { DatabaseUser } from '$lib/database/interfaces';


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

    const newUser: DatabaseUser = {
        _id:        new ObjectId(),
        logtoId:    data.newUser.sub,
        username:   data.newUser?.username, 
        email:      data.newUser?.email, 
        created:    data.newUser.created_at,
    }
     
    await createUser(newUser);

    return new Response(JSON.stringify(newUser), { status: 200 });

};

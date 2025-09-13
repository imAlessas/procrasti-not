// src/routes/api/users/[id].ts
import type { RequestHandler } from '@sveltejs/kit';
import { createUser, findUserByLogtoId, updateTheme } from '$lib/database/query';
import { ObjectId } from 'mongodb';
import type { DatabaseUser } from '$lib/database/interfaces';


export const POST: RequestHandler = async ({ request }) => {

    const data = await request.json();
    if (!data.newUser)
        return new Response(JSON.stringify({error: 'Property [newUser] is mandatory.'}), { status: 200 });

    const newUser: DatabaseUser = {
        _id:        new ObjectId(),
        logtoId:    data.newUser.sub,
        username:   data.newUser?.username, 
        email:      data.newUser?.email, 
        created:    data.newUser.created_at,
        theme:      'dark', 
    }
     
    await createUser(newUser);

    return new Response(JSON.stringify(newUser), { status: 200 });

};

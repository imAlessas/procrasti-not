// src/routes/api/users/[id].ts
import type { RequestHandler } from '@sveltejs/kit';
import { createUser, findUserByLogtoId, updateTheme } from '$lib/database/query';
import { ObjectId } from 'mongodb';
import type { DatabaseUser } from '$lib/database/interfaces';


export const PUT: RequestHandler = async ({ request}) => {

    const data = await request.json();

    if (!data.userID)
        return new Response(JSON.stringify({ error: 'Property [userID] is mandatory.' }), { status: 200 });
 
    if (!data.theme)
        return new Response(JSON.stringify({ error: 'Property [theme] is mandatory.' }), { status: 200 });

    const result = await updateTheme(new ObjectId(data.userID), data.theme);

    return new Response(JSON.stringify(result), { status: 200 });

};

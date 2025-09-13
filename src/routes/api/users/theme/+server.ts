import { updateTheme } from '$lib/database/query';
import { ObjectId } from 'mongodb';
import type { RequestHandler } from '@sveltejs/kit';


export const PUT: RequestHandler = async ({ request}) => {

    const data = await request.json();

    if (!data.userID)
        return new Response(JSON.stringify({ error: 'Property [userID] is mandatory.' }), { status: 200 });
 
    if (!data.theme)
        return new Response(JSON.stringify({ error: 'Property [theme] is mandatory.' }), { status: 200 });

    const result = await updateTheme(new ObjectId(data.userID), data.theme);

    return new Response(JSON.stringify(result), { status: 200 });

};

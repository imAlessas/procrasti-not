import { findUserByLogtoId } from '$lib/database/query';
import type { RequestHandler } from '@sveltejs/kit';


export const POST: RequestHandler = async ({ request }) => {

    const logtoID: string | undefined = (await request.json()).logtoID;

    if (!logtoID)
        return new Response(JSON.stringify({error: 'Property [logtoID] is mandatory.'}), { status: 200 });

    const user = await findUserByLogtoId(logtoID);
    if (!user)
        return new Response(JSON.stringify({error: 'User not found.'}), { status: 200 });

    return new Response(JSON.stringify(user), { status: 200 });
};


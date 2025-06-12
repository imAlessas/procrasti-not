// src/routes/api/users/[id].ts
import type { RequestHandler } from '@sveltejs/kit';
import { findUser } from '$lib/database/query';

export const GET: RequestHandler = async ({ params }) => {

    if (!params.id)
        return new Response(null, { status: 404 });

    const user = await findUser(params.id);
    if (!user)
        return new Response(null, { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
};

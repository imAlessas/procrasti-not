import { BASE_URL } from '$env/static/private';
import type { Actions } from './$types';
import { Users } from '$lib/models/Users';
import type { PageServerLoad } from './$types';
import { connectToMongoDB } from '$lib/database/mongoose';


export const actions: Actions = {
    signIn: async ({ locals }) => {
        await locals.logtoClient.signIn(`${BASE_URL}callback`);
    },
    signOut: async ({ locals }) => {
        await locals.logtoClient.signOut((`${BASE_URL}`));
    },
};


function serialize(doc: any) {
    return {
        ...doc,
        _id: doc._id.toString()
    };
}


export const load: PageServerLoad = async () => {
  
    await connectToMongoDB();

    const databaseUsers = (await Users.find().lean()).map(serialize);

    return { databaseUsers };

};

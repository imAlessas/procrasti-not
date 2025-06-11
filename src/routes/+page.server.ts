import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { Users } from '$lib/models/Users';
import { connectToMongoDB } from '$lib/server/mongoose'; // connection helper
import mongoose from 'mongoose';

const baseURL = env.BASE_URL



export const actions: Actions = {
  signIn: async ({ locals }) => {
    await locals.logtoClient.signIn(`${baseURL}callback`);
  },
  signOut: async ({ locals }) => {
    await locals.logtoClient.signOut((`${baseURL}`));
  },
};


function serialize(doc: any) {
	return {
		...doc,
		_id: doc._id.toString()
	};
}


export const load: PageServerLoad = async () => {
  
  await connectToMongoDB(); // ensures the logs above are now accurate

  const databaseUsers = (await Users.find().lean()).map(serialize);

  return { databaseUsers };

};

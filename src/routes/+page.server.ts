import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { Users } from '$lib/models/users';
import { connectDB } from '$lib/mongoose'; // connection helper

const baseURL = env.BASE_URL


export const actions: Actions = {
  signIn: async ({ locals }) => {
    await locals.logtoClient.signIn(`${baseURL}callback`);
  },
  signOut: async ({ locals }) => {
    await locals.logtoClient.signOut((`${baseURL}`));
  },
};




export const load: PageServerLoad = async () => {
  await connectDB(); // ensure DB connection is established
  
  const databaseUsers = await Users.find(); // fetch all users as plain JS objects

  console.log("Got users from db")
  console.log(databaseUsers)

  return { databaseUsers };
};

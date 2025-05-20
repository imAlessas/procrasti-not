import type { Actions } from './$types';
import { env } from '$env/dynamic/private';

const baseURL = env.BASE_URL


export const actions: Actions = {
  signIn: async ({ locals }) => {
    await locals.logtoClient.signIn(`${baseURL}/callback`);
  },
  signOut: async ({ locals }) => {
    await locals.logtoClient.signOut((`${baseURL}/`));
  },
};
import type { Actions } from './$types';

export const actions: Actions = {
  signOut: async ({ locals }) => {
    await locals.logtoClient.signOut('http://localhost:5173/');
  },
};

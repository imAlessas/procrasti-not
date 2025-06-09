import type { LayoutServerLoad } from './$types';

// Logto
export const load: LayoutServerLoad = async ({ locals }) => {
  return { user: locals.user };
};

import { handleLogto, UserScope } from '@logto/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { connectToMongoDB } from '$lib/server/db';
import { findOrCreateUser } from '$lib/server/queries';
import { THEME_COOKIE } from '$lib/utils/const';
import { DEFAULT_THEME, isTheme } from '$lib/utils/theme';

function required(name: string): string {
    const value = env[name];
    if (!value) throw new Error(`Missing environment variable ${name}`);
    return value;
}

const logto = handleLogto(
    {
        endpoint: required('LOGTO_ENDPOINT'),
        appId: required('LOGTO_APP_ID'),
        appSecret: required('LOGTO_APP_SECRET'),
        scopes: [UserScope.Email],
    },
    {
        encryptionKey: required('LOGTO_COOKIE_ENCRYPTION_KEY'),
    }
);

// Resolves the database user once per request and the theme used to render <body>.
const session: Handle = async ({ event, resolve }) => {
    if (event.locals.user) {
        try {
            event.locals.dbUser = await findOrCreateUser(event.locals.user);
        } catch (error) {
            console.error('Could not load the user from the database', error);
        }
    }

    const cookieTheme = event.cookies.get(THEME_COOKIE);
    const userTheme = event.locals.dbUser?.theme;
    event.locals.theme = isTheme(userTheme) ? userTheme : isTheme(cookieTheme) ? cookieTheme : DEFAULT_THEME;

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%theme%', event.locals.theme),
    });
};

export const handle = sequence(logto, session);

connectToMongoDB().catch((error) => console.error('MongoDB failed to start', error));

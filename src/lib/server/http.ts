import { error } from '@sveltejs/kit';
import { isValidObjectId } from 'mongoose';
import { MAX_TODO_LENGTH, type UserDoc } from './models';

// Returns the authenticated database user or answers 401.
export function requireUser(locals: App.Locals): UserDoc {
    if (!locals.dbUser)
        error(401, 'Authentication required');
    return locals.dbUser;
}

// Parses a JSON body. Requiring the JSON content type forces a CORS preflight on cross-site calls.
export async function readJson(request: Request): Promise<Record<string, unknown>> {
    if (!request.headers.get('content-type')?.includes('application/json'))
        error(415, 'Content-Type must be application/json');

    try {
        const body = await request.json();
        if (body && typeof body === 'object' && !Array.isArray(body))
            return body as Record<string, unknown>;
    } catch { /* falls through */ }

    error(400, 'Invalid JSON body');
}

export function parseObjectId(value: unknown): string {
    if (typeof value !== 'string' || !isValidObjectId(value) || value.length !== 24)
        error(400, 'Invalid id');
    return value;
}

export function parseText(value: unknown): string {
    if (typeof value !== 'string')
        error(400, 'Property [text] must be a string');

    const text = value.trim();
    if (text.length === 0)
        error(400, 'Property [text] must not be empty');
    if (text.length > MAX_TODO_LENGTH)
        error(400, `Property [text] must be at most ${MAX_TODO_LENGTH} characters`);

    return text;
}

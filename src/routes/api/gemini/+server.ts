import { GoogleGenAI } from '@google/genai';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { parseText, readJson, requireUser } from '$lib/server/http';
import { isRateLimited } from '$lib/server/rateLimit';

const DEFAULT_PROMPT =
    'Fix the typos and grammar of the following todo item. Keep its meaning and language, ' +
    'and reply with the corrected text only.';

let client: GoogleGenAI | null = null;

export const POST: RequestHandler = async ({ request, locals }) => {
    const user = requireUser(locals);

    if (!env.GEMINI_API_KEY)
        error(503, 'AI correction is not configured');

    if (isRateLimited(`gemini:${user._id}`, 10, 60_000))
        error(429, 'Too many requests, slow down a little');

    const text = parseText((await readJson(request)).text);

    const instruction = [env.GEMINI_LEADING_PROMPT, env.GEMINI_TRAILING_PROMPT]
        .filter(Boolean)
        .join('\n') || DEFAULT_PROMPT;

    try {
        client ??= new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

        // The user text is sent as content, never mixed into the system instruction
        const response = await client.models.generateContent({
            model: env.GEMINI_MODEL || 'gemini-2.5-flash',
            contents: text,
            config: { systemInstruction: instruction },
        });

        return json({ enhanced: response.text?.trim() || text });
    } catch (e) {
        console.error('Gemini request failed', e);
        error(502, 'The AI service is not available right now');
    }
};

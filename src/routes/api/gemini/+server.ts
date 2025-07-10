import { GoogleGenAI } from "@google/genai";
import type { RequestHandler } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';

const ai = new GoogleGenAI({apiKey: env.GEMINI_API_KEY});




export const GET: RequestHandler = async ({ request }) => {

    const text:string = (await request.json()).text;

    if ( !text || text.length === 0)
        return new Response(JSON.stringify({enhanced: ""}), { status: 200 });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${env.GEMINI_LEADING_PROMPT}${text}${env.GEMINI_TRAILING_PROMPT}`
    });



    return new Response(JSON.stringify({}), { status: 200 });

};

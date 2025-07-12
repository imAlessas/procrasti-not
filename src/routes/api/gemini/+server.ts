import { GoogleGenAI } from "@google/genai";
import type { RequestHandler } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';

const ai = new GoogleGenAI({apiKey: env.GEMINI_API_KEY});




export const POST: RequestHandler = async ({ request }) => {

    const text:string = (await request.json()).text;

    if ( !text || text.length === 0)
        return new Response(JSON.stringify({enhanced: ""}), { status: 200 });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${env.GEMINI_LEADING_PROMPT}${text}${env.GEMINI_TRAILING_PROMPT}`
    });

    if (!response.candidates || !response.candidates[0].content?.parts)
        return new Response(JSON.stringify({enhanced: text}), { status: 200 });


    return new Response(JSON.stringify({
        enhanced: response.candidates[0].content?.parts[0].text
    }), { status: 200 });

};

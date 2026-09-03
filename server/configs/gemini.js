import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateContent = async (prompt) => {

    const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt
    });

    return response.text;
};

export default generateContent;
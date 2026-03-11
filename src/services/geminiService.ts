import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getModelDescription = async (modelName: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a short, professional process description in German for a 3D model named "${modelName}". Include details about modeling, texturing, and lighting. Use Markdown format.`,
  });
  return response.text;
};

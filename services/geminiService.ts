
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (aiInstance) return aiInstance;

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error('Missing API Key');
  }

  aiInstance = new GoogleGenAI({ apiKey });
  return aiInstance;
};

export const getTravelAdvice = async (userPrompt: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the Kingsway Luxury Elite Concierge. Your motto is "Arrive With Confidence". 
        You provide sophisticated, helpful, and concise travel advice for high-net-worth individuals. 
        You specialize in recommending the right luxury vehicle from our fleet (Cadillac Escalade) 
        based on the user's event or needs. Your tone is professional, royal, refined, and exclusive. 
        Always refer to the user with utmost respect. Always prioritize privacy and punctuality in your suggestions.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.warn("Gemini Service:", error instanceof Error ? error.message : String(error));
    return "I am currently focused on coordinating our elite fleet. Please proceed to our reservation section or contact our 24/7 support line for immediate assistance.";
  }
};


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the Kingsway Luxury Elite Concierge. Your motto is "Arrive With Confidence". 
        You provide sophisticated, helpful, and concise travel advice for high-net-worth individuals. 
        You specialize in recommending the right luxury vehicle from our fleet (Mercedes S-Class, Rolls-Royce Ghost, Range Rover, Bentley) 
        based on the user's event or needs. Your tone is professional, royal, refined, and exclusive. 
        Always refer to the user with utmost respect. Always prioritize privacy and punctuality in your suggestions.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am having trouble connecting to my systems. Please try again or contact our 24/7 royal support line.";
  }
};

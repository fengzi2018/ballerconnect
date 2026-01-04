
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchNBANews = async () => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Summarize the top 5 latest NBA news items for today. Focus on trades, game results, and star player updates.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const newsText = response.text || "No news found.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      content: newsText,
      sources: sources
    };
  } catch (error) {
    console.error("Error fetching NBA news:", error);
    return { content: "Failed to load NBA news. Please try again later.", sources: [] };
  }
};

export const generateGameMemory = async (description: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A high-quality, dynamic cinematic basketball action shot of a street game: ${description}. Dramatic lighting, realistic style, vibrant colors.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image part found in response");
  } catch (error) {
    console.error("Error generating memory image:", error);
    throw error;
  }
};

export const getGearAdvice = async (shoeModel: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for professional reviews and user experiences of the ${shoeModel} basketball shoes. Include information about performance, durability, and sizing. Also mention the typical buying experience on platforms like Dewu (Poizon).`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error getting gear advice:", error);
    return "Could not fetch advice at this time.";
  }
};

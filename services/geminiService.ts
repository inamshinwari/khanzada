
import { GoogleGenAI, Type } from "@google/genai";
import { AppState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBusinessInsights(state: AppState) {
  if (!state.businessConfig) return null;

  const prompt = `
    Analyze the following business data and provide 3-4 actionable insights for the business owner.
    Business Type: ${state.businessConfig.type}
    Total Sales (Mock data context): ${state.transactions.filter(t => t.type === 'SALE').reduce((sum, t) => sum + t.amount, 0)}
    Total Expenses: ${state.transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0)}
    Business Inventory Count: ${state.inventory.length}
    Employees: ${state.employees.length}
    
    Format the response as JSON with fields 'summary' (string) and 'recommendations' (array of strings).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

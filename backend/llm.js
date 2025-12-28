import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// gemini-1.5-flash is the recommended free/fast model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateContent(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini:", error);
        // Handle 429 explicitly
        if (error.message.includes("429") || error.status === 429) {
            throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        }
        throw new Error("Failed to generate content from AI");
    }
}

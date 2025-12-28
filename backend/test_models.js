import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    const modelsToTest = ["gemini-2.5-flash", "gemini-3-flash", "gemini-2.5-flash-lite"];

    for (const modelName of modelsToTest) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`${modelName} worked: ` + result.response.text());
        } catch (error) {
            console.log(`${modelName} failed: ` + error.message);
        }
    }
}

listModels();

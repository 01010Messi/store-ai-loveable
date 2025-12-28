import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateContent } from './llm.js';
import {
    CLARIFICATION_PROMPT_1_AUDIENCE,
    CLARIFICATION_PROMPT_2_PRICE,
    CLARIFICATION_PROMPT_3_AESTHETIC,
    BLUEPRINT_PROMPT
} from './prompts.js';
import { INITIAL_STATE } from './types.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

function parseJSON(text) {
    try {
        const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("JSON Parse Error:", e);
        return null;
    }
}

app.post('/chat', async (req, res) => {
    try {
        const { message, conversation_state } = req.body;
        // Ensure defaults if state is missing properties (e.g. from old client)
        let state = conversation_state || INITIAL_STATE;
        if (!state.clarification_step) state.clarification_step = 0;

        let reply = "";
        let options = [];
        let blueprint = null;

        // --- STATE MACHINE ---

        if (state.stage === 'INITIAL_INTENT') {
            // TRANSITION: INITIAL -> CLARIFICATION (Step 1)
            state.initial_intent = message;
            state.stage = 'CLARIFICATION';
            state.clarification_step = 1;

            const prompt = CLARIFICATION_PROMPT_1_AUDIENCE.replace('{initial_intent}', state.initial_intent);
            const aiRaw = await generateContent(prompt);
            const aiData = parseJSON(aiRaw);

            if (aiData) {
                reply = aiData.question;
                options = aiData.options;
                // Store question in history? Not strictly needed for logic, but good for tracking
                state.clarification_questions.push(aiData.question);
            } else {
                // Fallback if JSON fails
                reply = "Could you tell me who your target audience is?";
                options = ["General Public", "Niche Hobbyists", "Professionals", "Other (type your own)"];
            }

        } else if (state.stage === 'CLARIFICATION') {

            // Handle incoming answer based on CURRENT step
            // We are receiving the answer to the QUESTION ASKED in the PREVIOUS response.
            // So if step is 1, we just asked Audience. The message IS the Audience.
            // Then we move to Step 2.

            if (state.clarification_step === 1) {
                state.clarification_answers += `\nTarget Audience: ${message}`;
                state.clarification_step = 2; // Move to next

                const prompt = CLARIFICATION_PROMPT_2_PRICE
                    .replace('{initial_intent}', state.initial_intent)
                    .replace('{clarification_answers}', state.clarification_answers);

                const aiRaw = await generateContent(prompt);
                const aiData = parseJSON(aiRaw);

                if (aiData) {
                    reply = aiData.question;
                    options = aiData.options;
                    state.clarification_questions.push(aiData.question);
                } else {
                    reply = "What is the price range of your products?";
                    options = ["Budget ($0-$50)", "Mid-Range ($50-$150)", "Premium ($150+)", "Other"];
                }

            } else if (state.clarification_step === 2) {
                state.clarification_answers += `\nPricing: ${message}`;
                state.clarification_step = 3; // Move to next

                const prompt = CLARIFICATION_PROMPT_3_AESTHETIC
                    .replace('{initial_intent}', state.initial_intent)
                    .replace('{clarification_answers}', state.clarification_answers);

                const aiRaw = await generateContent(prompt);
                const aiData = parseJSON(aiRaw);

                if (aiData) {
                    reply = aiData.question;
                    options = aiData.options;
                    state.clarification_questions.push(aiData.question);
                } else {
                    reply = "What is your brand's aesthetic?";
                    options = ["Minimalist", "Bold/Color", "Vintage", "Luxury", "Other"];
                }

            } else if (state.clarification_step === 3) {
                // Done with clarification. Move to Blueprint.
                state.clarification_answers += `\nAesthetic: ${message}`;
                state.stage = 'BLUEPRINT';

                // Fallthrough to Blueprint generation logic immediately
            }
        }

        if (state.stage === 'BLUEPRINT') {
            const prompt = BLUEPRINT_PROMPT
                .replace('{initial_intent}', state.initial_intent)
                .replace('{clarification_answers}', state.clarification_answers);

            const aiRaw = await generateContent(prompt);
            const aiData = parseJSON(aiRaw);

            if (aiData) {
                blueprint = aiData;
                reply = "Here is your store blueprint based on our conversation.";
            } else {
                console.error("Failed to parse blueprint JSON");
                reply = "I created a blueprint but there was an error formatting it. Please try again.";
            }
        }

        res.json({
            reply,
            options, // Send options to frontend
            conversation_state: state,
            blueprint
        });

    } catch (error) {
        console.error("Error in /chat:", error);
        console.log("Falling back to mock response due to error.");
        const mockResponse = generateMockResponse(req.body.conversation_state || INITIAL_STATE, req.body.message);
        res.json(mockResponse);
    }
});

function generateMockResponse(state, message) {
    let newState = JSON.parse(JSON.stringify(state));
    if (!newState.clarification_step) newState.clarification_step = 0;

    let reply = "";
    let options = [];
    let blueprint = null;

    if (newState.stage === 'INITIAL_INTENT') {
        newState.initial_intent = message;
        newState.stage = 'CLARIFICATION';
        newState.clarification_step = 1;
        reply = "Who is your primary target audience?";
        options = ["Gen Z Trendsetters", "Professionals", "Budget Shoppers", "Luxury Collectors", "Other"];

    } else if (newState.stage === 'CLARIFICATION') {
        if (newState.clarification_step === 1) {
            newState.clarification_answers += `\nTarget Audience: ${message}`;
            newState.clarification_step = 2;
            reply = "What is your price positioning?";
            options = ["Affordable (<$50)", "Mid-Market ($50-$200)", "Premium ($200+)", "Other"];

        } else if (newState.clarification_step === 2) {
            newState.clarification_answers += `\nPricing: ${message}`;
            newState.clarification_step = 3;
            reply = "How would you describe the brand aesthetic?";
            options = ["Minimalist & Clean", "Vibrant & Bold", "Vintage/Retro", "Modern Industrial", "Other"];

        } else if (newState.clarification_step === 3) {
            newState.clarification_answers += `\nAesthetic: ${message}`;
            newState.stage = 'BLUEPRINT';
            reply = "Generating your store blueprint...";

            blueprint = {
                brandOverview: {
                    name: "Mock Store",
                    tagline: "Your Vision, Realized",
                    description: "A placeholder store generated because the AI service is currently unavailable.",
                    targetAudience: "General Audience",
                    positioning: "Affordable & Quality"
                },
                productCategories: [
                    { name: "Featured", description: "Top selling items" },
                    { name: "New Arrivals", description: "Latest additions" },
                    { name: "Accessories", description: "Complementary items" }
                ],
                sampleProducts: [
                    { name: "Sample Product A", description: "A great product", priceRange: "$10-20", category: "Featured" },
                    { name: "Sample Product B", description: "Another amazing item", priceRange: "$25-50", category: "New Arrivals" }
                ],
                homepageStructure: {
                    hero: "Welcome to Mock Store - Discover Quality",
                    sections: ["Hero Banner", "Featured Collection", "About Us", "Newsletter"]
                },
                essentialPages: ["Home", "Shop", "About", "Contact"],
                policies: ["Privacy Policy", "Terms of Service", "Refund Policy"]
            };
        }
    } else if (newState.stage === 'BLUEPRINT') {
        reply = "The blueprint has already been generated. You can refine it by restarting the conversation.";
        blueprint = state.blueprint;
    }

    return {
        reply,
        options,
        conversation_state: newState,
        blueprint
    };
}

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});

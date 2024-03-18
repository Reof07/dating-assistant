import { ChatGoogleGenerativeAI } from "@langchain/google-genai"


export const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-1.0-pro',
    temperature: 0.3,
    topK: 1,
    topP: 1,
    maxOutputTokens: 326,
})

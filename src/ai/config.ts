
import "dotenv/config"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"


const MODEL_NAME : string | undefined | any = process.env.MODEL_NAME
const API_KEY : string | undefined | any = process.env.API_KEY

/**
 * 
 */
export const  createGenerativeModel = () => {
    const genAI: any = new GoogleGenerativeAI(API_KEY)
    return genAI.getGenerativeModel({ model: MODEL_NAME })
}

/**
 * 
 */
export const getGenerationConfig = () => ({
    temperature: 0.5,
    topK: 1,
    topP: 1,
    maxOutputTokens: 500,
})

/**
 * 
 */
export const getSafetySettings = () => [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
]
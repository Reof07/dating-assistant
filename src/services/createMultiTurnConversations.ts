
import { 
    createGenerativeModel,
    getGenerationConfig,
    getSafetySettings 
} from "../ai/config"

const model = createGenerativeModel();
const generationConfig = getGenerationConfig();
const safetySettings = getSafetySettings();
const conversationContext: [string, string][] = [];

// Restaurar el contexto de la conversación
const currentMessages = conversationContext.flatMap(([inputText, responseText]) => [
    { role: "user", parts: inputText },
    { role: "model", parts: responseText }
]);
/**
 * 
 */
const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: currentMessages // []
})



/**
 * 
 * @param msg 
 */
export const generateMultiturnConvertion = async (msg: string) => {
    const result = await chat.sendMessage(msg)
    const response = await result.response
    const modelresponse = response.text()
    conversationContext.push([msg, modelresponse]);
    return modelresponse

} 
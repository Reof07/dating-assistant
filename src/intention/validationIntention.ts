import { Intention, intentionKeywords } from "./intents"

/**
 * 
 * @param message 
 */
export const validateIntentions = (message: string): Promise<Intention> => {
  const lowerCaseMessage = message.toLowerCase()

  if (containsAny(lowerCaseMessage, intentionKeywords.GREETING)) {
    return Promise.resolve(Intention.GREETING)
  } else if (containsAny(lowerCaseMessage, intentionKeywords.APPOINTMENT)) {
    return Promise.resolve(Intention.APPOINTMENT)
  }

  return Promise.resolve(Intention.DEFAULT)
};

/**
 * 
 * @param message 
 * @param keywords 
 */
const containsAny = (message: string, keywords: string[]): boolean => {
  return keywords.some(keyword => message.includes(keyword))
};

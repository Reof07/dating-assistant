import { Request, Response } from "express"
import "dotenv/config"

import { createGenerativeModel, getGenerationConfig, getSafetySettings  } from "../ai/config"
import { intentHandler } from "../services/intentHandler.service"
import { sendMessages } from "../services/message.service"
import  { Actions } from "../interfaces/action.interface"
import { getTextMessageInput, getTemplatedMessageInput } from "../messageHelper/mesaage.helper"

const model = createGenerativeModel();

/**
 * 
 * @param req 
 * @param res 
 */
const webhookController = async (req: Request, res: Response) => {
    try {
        if(
            req.query['hub.mode'] == 'subscribe' &&
            req.query['hub.verify_token'] == process.env.VERIFICATION_TOKEN
        ){
            res.send(req.query['hub.challenge'])
        }
        else {
            res.sendStatus(400)
        }
    } catch (error) {
        console.log('Error')
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
const receiveMessageController = async (req: Request, res: Response) =>{
    try {
        const incomingData = req.body;
        const generationConfig = getGenerationConfig();
        const safetySettings = getSafetySettings();
    
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [

            ]
        });


        if (incomingData.object && incomingData.entry?.[0]?.changes?.[0]?.value) {
            
            const { messages, contacts } = incomingData.entry[0].changes[0].value

            if (messages && contacts) {
                const { text } = messages[0];
                const type  = messages[0]?.type
                const { wa_id } = contacts[0]

                if (text) {
                    const result = await chat.sendMessage(text.body);
                    const response = await result.response;
                    const text2 = response.text();
                    console.log('BOT', text2)
                    await sendMessages (await getTextMessageInput(wa_id, text2))

                    //await intentHandler(wa_id, text.body);
                }
                // if (type === "button") {
                //     const { text } = messages[0]?.button
                //     //await intentHandler(wa_id, text);
                // }
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Error en receiveMessageController:', error);
        res.status(500).send('Error interno del servidor');
    }
}


export {
    webhookController,
    receiveMessageController
}
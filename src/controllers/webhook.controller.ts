import { Request, Response } from "express"
import "dotenv/config"

import { sendMessages } from "../services/message.service"
import { getTextMessageInput, getTemplatedMessageInput } from "../messageHelper/mesaage.helper"
import { generateMultiturnConvertion } from "../services/createMultiTurnConversations"

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
        if (incomingData.object && incomingData.entry?.[0]?.changes?.[0]?.value) {
            
            const { messages, contacts } = incomingData.entry[0].changes[0].value

            if (messages && contacts) {
                const { text } = messages[0];
                const { wa_id } = contacts[0]

                if (text) {
                    const text2 = await generateMultiturnConvertion(text.body)
                    await sendMessages (await getTextMessageInput(wa_id, text2))
                }
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
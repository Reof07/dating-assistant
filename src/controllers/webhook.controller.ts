import { Request, Response } from "express"
import "dotenv/config"

import { intentHandler } from "../services/intentHandler.service"

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
                        await intentHandler(wa_id, text.body);
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
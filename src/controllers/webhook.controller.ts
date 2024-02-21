import { Request, Response } from "express";
import "dotenv/config"

import { sendMessage } from '../interfaces/parametersWhatsapp.interface'
import { sendWhatsAppResponse } from "../services/sendWhatsAppResponse";

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
    
    const incomingData = req.body;
    const messages = incomingData.entry[0].changes[0].value.messages;
    const contacts = incomingData.entry[0].changes[0].value.contacts;

    console.log('Mensajes:', messages);
    console.log('Contactos:', contacts);
    const { wa_id }  = contacts[0]
    const whatsappBusinessPhoneNumber: string = process.env.WHATSAPP_BUSINESS_PHONE_NUMBER || '';
    const parametersContact: sendMessage = { 
        phoneNumberId: whatsappBusinessPhoneNumber,
        userPhoneNumber: wa_id
    }

    //Si el contacto no existe, funcion para manejar si el contacto no existe (Crear el nuevo contacto y enviar mensaje de bienvenida)
    // Se rl cotacto  existe funcion para ver la intancion y responder segun lo requerido.
    if (messages[0].type == 'text') {
        console.log('ESTE ES EL MENSAJE', messages[0].text)
        sendWhatsAppResponse(parametersContact, 'Hola, como estas?')
    }
}


export {
    webhookController,
    receiveMessageController
}
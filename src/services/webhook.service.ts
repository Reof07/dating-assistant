import { Request, Response } from "express"
import "dotenv/config"

/**
 * 
 * @param req 
 */
const webhookConnectionService = async (req:Request) => {
    if (
        req.query['hub.mode'] == 'subscribe' && 
        req.query['hub.verify_token'] == process.env.VERIFICATION_TOKEN
    ) {
        return req.query['hub.challenge']
    } else {
        throw new Error ('Connection failed')
    }
}


const receiveMessageService = async (incomingData: any) => {
    //const incomingData = req.body;
    console.log('data', incomingData)
    // Accede a las propiedades messages y contacts
    // const messages = incomingData.entry[0].changes[0].value.messages;
    // const contacts = incomingData.entry[0].changes[0].value.contacts;

    // // Puedes imprimir o utilizar la información como sea necesario
    // console.log('Mensajes:', messages);
    // console.log('Contactos:', contacts);

    // if (messages[0].type == 'text') {
    //     console.log('ESTE ES EL MENSAJE', messages[0].text)
    // }
}


export {
    webhookConnectionService,
    receiveMessageService
}
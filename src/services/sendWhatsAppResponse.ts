import "dotenv/config"
import axios from 'axios'

import { validationsIntention } from "../intention/greet"
import { GREETINGS, welcomeMessage } from "../const/botActions.const"
import { getTextMessageInput, getTemplatedMessageInput } from "../messageHelper/mesaage.helper"
import { getEnabledCategories } from "trace_events"

/**
 * 
 * @param data 
 */
const sendMessages = async (data: any) => {
      const whatsappMessageURL = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_BUSINESS_PHONE_NUMBER}/messages`;
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN_WHATSAPP}`
      }
      const responsePayload = data  
    try {
       axios.post(whatsappMessageURL,  responsePayload, {
        headers: header
      })
    } catch(e) {
      console.log(e);
    }
  }

/**
 * 
 * @param body 
 */
const  handleIntentions = async (body: string , contact: any): Promise<void> => {
  const intention = await validationsIntention(body);
  const { wa_id } = contact[0];
  const  nameUser : string = contact[0].profile.name
  if(intention){
    if(GREETINGS.includes(intention)){
      const gettextMessage = await getTextMessageInput(wa_id, welcomeMessage(nameUser))
      await sendMessages(gettextMessage)
      .then(async () => {
        const getTemplate = await getTemplatedMessageInput(wa_id, 'hola')
        await sendMessages(getTemplate);
      })
    }
  }else {
    console.log('itention not implemented')
  }
}

export {
    handleIntentions
}


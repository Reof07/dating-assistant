import axios from 'axios'
import "dotenv/config"
import { sendMessage } from '../interfaces/parametersWhatsapp.interface'


/**
 * 
 * @param parameters 
 * @param responseText 
 */
const sendWhatsAppResponse = (parameters: sendMessage, responseText = "") => {
    const accessToken = process.env.ACCESS_TOKEN_WHATSAPP
    const whatsappMessageURL = `https://graph.facebook.com/v18.0/${parameters.phoneNumberId}/messages`;
    const responsePayload = {
        messaging_product: 'whatsapp',
        recipientType: 'individual',
        type: 'text',
        to: parameters.userPhoneNumber,
        text: {
          preview_url: false,
          body: responseText
        }
      }
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }

      
  //send response
  try {
    axios.post(whatsappMessageURL,  responsePayload, {
      headers: header
    })  
  } catch(e) {
    console.log(e);
  }
}

export {
    sendWhatsAppResponse
}
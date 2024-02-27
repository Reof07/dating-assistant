import "dotenv/config"
import axios from 'axios'

/**
 * 
 * @param data 
 */
export const sendMessages = async (data: any) => {
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
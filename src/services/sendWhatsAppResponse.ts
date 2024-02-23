import "dotenv/config"
import axios from 'axios'

import { validationsIntention } from "../intention/greet"
import { sendMessage } from '../interfaces/parametersWhatsapp.interface'

/**
 * @description handle parameters
 * @param contacts 
 */
const getParameters= async(contacts: any[]): Promise<sendMessage> => {
  const { wa_id } = contacts[0];
  const whatsappBusinessPhoneNumber: string = process.env.WHATSAPP_BUSINESS_PHONE_NUMBER || '';
  return {
      phoneNumberId: whatsappBusinessPhoneNumber,
      userPhoneNumber: wa_id
  };
}


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
  /**
   * debe existir una funcion que reciba la intencion del usuairio
   * mapae la intencion en este caso saludar y realizar la ioperacion de la funcion saludar.
   * 
   * si es saludar la funcion de enviar un mesaje de bienvenida al usaurio y 
   * inidicar las acciones que debe realizar, esto debe ser una lista de opciones 
   * con algunas de las siguinetes categorias: 
   * 1- Citas : debe crear, actualizar y cancelar citas
   * 2- servicios : debe mostrar todos los servicios y precios
   * 3- ayuda : ????/
   * 4- horario de trabajo : debe mostrar el horario de trabajo
   * 5- ubicacion. : debe enviar la ubicacion.
   * 
   * const que hacer en funion de la intencion = getintentionAndresponse(intencion){
   * 
   * const obj = {
   *   hola = ()= >{},
   *   citas = () => {}
   * }
   * 
   * }
  */
  const intention = await validationsIntention(body); //usar para ver la intencion e indicarle al bot que hacer para luego responder
  const parametersContact  = await getParameters(contact) as unknown as sendMessage
  sendWhatsAppResponse(parametersContact, 'Hola, como estas?');
}

export {
    handleIntentions
}


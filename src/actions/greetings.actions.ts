import { sendMessages } from "../services/message.service"
import  { Actions } from "../interfaces/action.interface"
import { getTextMessageInput, getTemplatedMessageInput } from "../messageHelper/mesaage.helper"

export class GreetingsAction implements Actions {

  execute: Actions['execute'] = async (wa_id, message) => {
    const welcomeMessage = `Hola! Bienvenido al servicio de gestión de citas. 👋 ¿En qué puedo ayudarte?`;
    await sendMessages (await getTextMessageInput(wa_id, welcomeMessage))

    const getTemplate =  await getTemplatedMessageInput(wa_id, 'hola')
    await sendMessages(getTemplate);

  };
}

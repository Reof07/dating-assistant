import { sendMessages } from "../services/message.service"
import  { Actions } from "../interfaces/action.interface"
import { getTextMessageInput, getTemplatedMessage } from "../messageHelper/mesaage.helper"



const questionDay = "¿En qué Fecha te gustaría agendar tu cita?"

/**
 * Agrega una nueva cita
 */
const addNewDate = async (wa_id : any) => {
 const messageToSetDate = questionDay
 //1 - preguntar dia
 await sendMessages (await getTextMessageInput(wa_id, messageToSetDate))

}

/**
 * Objeto para manejar citas
 */
const appointmentType = {
    agendar: addNewDate,

}


// const hadlerType = (type: string) => {

//     const hadler = appointmentType[type]
//     return  hadler(type)
// }

export class AppointmentAction implements Actions {
    execute: Actions['execute'] = async (wa_id, message) => {
        const lowerCaseMessage = message.toLowerCase().split(' ')[0]
        
        if(lowerCaseMessage === 'agendar'){
            console.log('agendar')
            await addNewDate(wa_id)
        }
        // que hago si tengo que crear , eliminar o actualizar
    }
}
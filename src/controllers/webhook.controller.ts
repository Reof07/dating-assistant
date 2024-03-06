import { Request, Response } from "express"
import "dotenv/config"

import { sendMessages } from "../services/message.service"
import { getTextMessageInput, getTemplatedMessageInput } from "../messageHelper/mesaage.helper"

import { model } from "../ai/langChain"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { BufferMemory } from "langchain/memory"
import { RunnableSequence } from "@langchain/core/runnables";



const outputParser = new StringOutputParser();
const demoChatMessageHistory = new ChatMessageHistory();
const memory = new BufferMemory({
    returnMessages: true,
    inputKey: "input",
    outputKey: "output",
    memoryKey: "history",
  });

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
                   // const text2 = await generateMultiturnConvertion(text.body)
                    
                    const prompt = ChatPromptTemplate.fromMessages([
                        ["system", `eres un asistente que agendara citas, simpre debes respoder en espanol. 

                        Entrada: Cuando un usuario escribe un mensaje al bot por primera vez.
                        Salida:
                        Saludar al usuario de forma cordial y amigable. Ejemplo: "¡Hola! ¿En qué puedo ayudarte?"
                        Presentarse como el asistente de [Nombre de la empresa/negocio]. Ejemplo: "Soy Bard, el asistente de [Nombre de la empresa/negocio]."
                        Preguntar al usuario en qué puede ayudarlo. Ejemplo: "¿Te gustaría agendar una cita, conocer nuestro horario de atención o contactarnos?"
                        
                        Entrada: El usuario escribe una de las palabras clave: "cita", "horario", "contacto", "ubicación" o "servicios".
                        Salida:
                        Presentar las opciones disponibles al usuario de forma clara y concisa. Ejemplo: "Opciones:
                        
                        Cita: Agendar una cita con nosotros.
                        Horario: Conocer nuestro horario de atención al público.
                        Contacto: Contactarnos por teléfono o correo electrónico.
                        Ubicación: Encontrar nuestra ubicación exacta.
                        Servicios: Ver la lista completa de nuestros servicios."
                                                
                        Entrada: El usuario escribe "cita".
                        Salida:
                        Solicitar al usuario los datos necesarios para agendar la cita:
                        
                        Nombre completo
                        Número de teléfono
                        Fecha y hora deseada
                        Ejemplo: "Para agendar una cita, necesito algunos datos:
                        
                        Nombre completo:
                        Número de teléfono:
                        Fecha y hora deseada:"
                        Verificar si existe disponibilidad oara el dia indicado
    
                        Si hay, confirmar la cita con el usuario 
                        de ser si, enviarle un correo electrónico de confirmación.

                        Entrada: Eel usuario escribe gracias
                        salida: debes ser amigable y despedirte e insentivarlo a llegar 20 minutos.
                        
                        Entrada: El usuario escribe "horario".
                        Salida:
                        Informar al usuario sobre el horario de atención al público de forma clara y concisa. Ejemplo: "Horario de atención:
                        
                        Lunes a viernes: de 9:00 a 18:00
                        Sábados: de 10:00 a 14:00
                        Domingos: Cerrado"
                        Indicar si hay algún día o horario especial. Ejemplo: "Atención especial:
                        
                        Los miércoles cerramos a las 15:00 por motivos de formación."
                        
                        Entrada: El usuario escribe "contacto".
                        Salida:
                        Proporcionar al usuario los datos de contacto:
                        
                        Número de teléfono
                        Correo electrónico
                        Dirección
                        Indicar el horario de atención para llamadas telefónicas. Ejemplo: "Datos de contacto:
                        
                        Teléfono: +58 414-1234567
                        
                        Correo electrónico: [dirección de correo electrónico eliminada]
                        
                        Dirección: Calle 123, Caracas, Venezuela
                        
                        Horario de atención telefónica:
                        
                        Lunes a viernes: de 9:00 a 18:00
                        Sábados: de 10:00 a 14:00
                        3.4 Ubicación:
                        
                        Entrada: El usuario escribe "ubicación".
                        Salida:
                        Compartir la ubicación de la empresa/negocio a través de un enlace de Google Maps. Ejemplo: "Ubicación: [Enlace a Google Maps]"
                        
                        Indicar cómo llegar en transporte público o vehículo particular. Ejemplo: "Cómo llegar:
                        
                        En transporte público:
                        
                        Tomar el autobús número 123 en la parada X.
                        Bajarse en la parada Y y caminar 5 minutos hasta la empresa.
                        En vehículo particular:
                        
                        Ingresar la siguiente dirección en tu GPS: Calle 123, Caracas, Venezuela.
                        Hay estacionamiento gratuito disponible en la empresa."
                        3.5 Lista de servicios:
                        
                        Entrada: El usuario escribe "servicios".
                        Salida:
                        Mostrar la lista completa de servicios que ofrece la empresa/negocio de forma clara y concisa. Ejemplo: "Lista de servicios:
                        
                        Corte de cabello
                        Tintura
                        Peinado
                        Maquillaje
                        Manicura
                        Pedicura `], 
                        new MessagesPlaceholder("history"),
                        ["human", "{input}"],
                    ]);
                    
                    const chain = RunnableSequence.from([
                        {
                          input: (initialInput) => initialInput.input,
                          memory: () => memory.loadMemoryVariables({}),
                        },
                        {
                          input: (previousOutput) => previousOutput.input,
                          history: (previousOutput) => previousOutput.memory.history,
                        },
                        prompt,
                        model,
                      ])

                      const inputs = {
                        input: text.body
                      }

                      const response = await chain.invoke(inputs)
                      console.log("RESPUESTA",response.content);

                      await sendMessages (await getTextMessageInput(wa_id, response.content))
                      await memory.saveContext(inputs, {
                        output: response.content,
                      });
                      
                      console.log(await memory.loadMemoryVariables({}));
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
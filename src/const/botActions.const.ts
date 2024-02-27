
export const GREETINGS : Array<string>= [
    'hola',
    'ola',
    'como estas',
    'Buenos',
    'buenas tardes',
    'noches',
    'tardes',
    'tarde',
    'una',
    'pregunta',
    'buenas'
]

export const CATEGORIES  : Array<string>= [
    'horarios',
    'Agendar cita',
    'cancelar cita',
    'cambiar cita'

]

/**
 * 
 * @param userName 
 */
export const welcomeMessage = (userName: string): string => {
    return `¡Hola *${userName}*! 😊🎉 Bienvenido a nuestro servicio de citas. Estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?`
  }





export enum Intention {
    GREETING = 'GREETING',
    APPOINTMENT = 'APPOINTMENT',
    SEVICES = 'SEVICES',
    LOCATION = 'LOCATION',
    CONTACT = 'CONTACT',
    SCHEDULE = 'SCHEDULE',
    DEFAULT = 'DEFAULT'
  }

export const intentionKeywords: Record<Intention, string[]> = {
    GREETING: ['hola', 'buenos días', 'saludos'],
    APPOINTMENT: ['agendar citas', 'eliminar citas', 'cambiar citas', 'horarios', 'ubicacion', 'contacto'],
    SEVICES: ['servicio'],
    LOCATION: ['ubicacion'],
    CONTACT: ['contacto'],
    SCHEDULE: ['horarios'],
    DEFAULT: []

  }
import  { Actions } from "../interfaces/action.interface"
import { validateIntentions } from "../intention/validationIntention"
import { GreetingsAction } from '../actions/greetings.actions';
import { Intention } from "../intention/intents"

const actions: Record<Intention, Actions> = {
  GREETING: new GreetingsAction(),
  APPOINTMENT: new GreetingsAction(),
  SEVICES: new GreetingsAction(),
  LOCATION : new GreetingsAction(),
  CONTACT :  new GreetingsAction(),
  SCHEDULE : new GreetingsAction(),
  DEFAULT: new GreetingsAction(), // Otra acción por defecto
};

/**
 * 
 * @param wa_id 
 * @param message 
 */
export const intentHandler = async (wa_id: string, message: string): Promise<void> => {
  const intention = await validateIntentions(message);
  const action = actions[intention];

  await action.execute(wa_id, message);
};


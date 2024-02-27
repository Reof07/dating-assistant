
/**
 * @description This function is responsible to validate the intention of user interaction.
 */
const validationsIntention = async  (inputText: string)  =>  {
    const gretingRegex = /\b(hola|ola|como\s+estas|buenos\s+d[íi]as|buenas\s+tardes|buenas\s+noches|Buenos|buenas\s+tardes|noches|tardes|tarde|una|pregunta|buenas)\b/i;
    const coincidencias = inputText.toLowerCase().match(gretingRegex);
    return coincidencias ? coincidencias[0] : coincidencias
}

export {
    validationsIntention
}


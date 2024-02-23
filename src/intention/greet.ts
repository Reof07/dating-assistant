
/**
 * @description This function is responsible to validate the intention of user interaction.
 */
const validationsIntention = async  (inputText: string)  =>  {
    const gretingRegex = /\b(hola|buenos\s+d[íi]as|buenas\s+tardes|buenas\s+noches)\b/i
    const coincidencias = inputText.toLowerCase().match(gretingRegex);
    return coincidencias ? coincidencias[0] : coincidencias
}

export {
    validationsIntention
}


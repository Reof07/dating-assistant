

/**
 * 
 * @param recipient 
 * @param text 
 */
export const getTextMessageInput = async (recipient:any , text:any) => {
    return JSON.stringify({
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": recipient,
      "type": "text",
      "text": {
          "body": text
      }
    });
  }

export const  getTemplatedMessageInput= async (recipient: any, data: string) => {
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": recipient,
        "type": "template",
        "template": {
          "name": "hola_mundo",
          "language": {
            "code": "es"
          }}
        }
    )
  }


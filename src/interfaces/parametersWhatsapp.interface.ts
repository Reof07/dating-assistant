

type formatnumber = `58${string & { length: 9 }}`

export interface sendMessage {
    phoneNumberId : string;
    userPhoneNumber : formatnumber;
}
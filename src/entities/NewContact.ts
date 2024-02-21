import { Entity, Column } from "typeorm"
import { Base } from "./Base"

type genderType = "male" | "female" | "other"

@Entity('contacts')
export class NewContact extends Base {

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phoneNumber: string

    @Column()
    email: string

    @Column({
        type: "enum",
        enum: ["male", "female", "other"],
        default: "other"
    })
    gender: genderType 
}
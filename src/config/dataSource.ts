import "dotenv/config"
import { DataSource } from "typeorm"
import {User} from "../entities/User"
import { NewContact } from "../entities/NewContact";

const dbType: string | undefined = process.env.DB_TYPE;

export const AppDataSource = new DataSource({
    type: dbType as any ,
    host:  process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    entities: [User, NewContact],
    logging: true,
    synchronize: true,
})
 
// Ojo si coloco esto dentro de entities no me consigue nada
//../entities/*.ts", "../entities/*.js
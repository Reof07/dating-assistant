import { 
    PrimaryGeneratedColumn,
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn 
} from "typeorm"

/**
 * @description 
 */
export abstract class Base {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date



}
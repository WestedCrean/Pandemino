import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ExclusionPolicy, Expose, Groups, Strategy } from "typeserializer"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    password: string
}

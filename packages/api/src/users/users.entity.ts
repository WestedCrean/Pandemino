import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

}
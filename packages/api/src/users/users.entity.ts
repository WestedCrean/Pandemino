import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"

export enum UserRole {
    lecturer = 'lecturer',
    student = 'student'
  }

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

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.student
    })
    role: UserRole

}
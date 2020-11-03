import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"

export enum UserRole {
    lecturer = 'lecturer',
    student = 'student'
  }

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    title: string

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
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
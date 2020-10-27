import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ExclusionPolicy, Expose, Groups, Strategy } from "typeserializer"
import { Course } from "./course"


@Entity("users")
class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    /**
    @OneToMany(() => Course, (course: Course) => course.lecturer)
    courses: Course[]
     */
}

export { User }

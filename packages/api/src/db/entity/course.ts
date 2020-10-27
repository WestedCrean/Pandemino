import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { ExclusionPolicy, Expose, Groups, Strategy } from "typeserializer"


import {Stream, User} from "../entity"

@Entity("courses")
class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column() //ManyToOne -> users
    lecturer: string

    @OneToMany(() => Stream, (lecture: Stream) => lecture.course)
    lectures: Stream[]
}

export { Course }

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Course } from "./course"

@Entity("streams")
class Stream {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column("int")
    views: number

    @Column()
    isPublished: boolean

    @Column()
    isLive: boolean

    @ManyToOne(() => Course, (course: Course) => course.lectures)
    course: Course
}

export { Stream }

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Course } from "../courses/courses.entity"

@Entity("lectures")
class Lecture {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column({
        type: "text",
        default: ''
    })
    description: string

    @Column({
        type: "int",
        default: 0
    })
    views: number

    @Column({
        default: false
    })
    isPublished: boolean

    @Column({
        default: false
    })
    isLive: boolean

    @ManyToOne(() => Course, (course: Course) => course.lectures)
    course: Course
}

export { Lecture }
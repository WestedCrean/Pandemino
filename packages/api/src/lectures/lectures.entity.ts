import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Course } from "../courses/courses.entity"
import { LectureFrequency } from "../lectureFrequency/lectureFrequency.entity"
import { File } from "../file/file.entity"
import { Quiz } from "src/quiz/quiz.entity"

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
        default: "",
    })
    description: string

    @Column({
        type: "int",
        default: 0,
    })
    views: number

    @Column({
        default: false,
    })
    isPublished: boolean

    @Column("timestamp")
    createdAt: Date

    @ManyToOne(() => Course, (course: Course) => course.lectures, { onDelete: "CASCADE" })
    @JoinColumn()
    course: Course

    @OneToMany(() => LectureFrequency, (LectureFrequency: LectureFrequency) => LectureFrequency.lecture)
    lectureFrequency: LectureFrequency[]

    @OneToMany(() => File, (file: File) => file.lecture)
    file: File[]

    @OneToMany(() => Quiz, (quiz: Quiz) => quiz.lecture)
    quiz: Quiz[]
}

export { Lecture }

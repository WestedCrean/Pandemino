import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm"
import { Lecture } from "../lectures/lectures.entity"
import { UserCourse } from "../userCourses/userCourses.entity"

@Entity("courses")
class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string

    @Column({
        type: "text",
        default: "",
    })
    description: string

    @Column({
        default: "",
    }) //ManyToOne -> users
    lecturer: string

    @OneToMany(() => Lecture, (lecture: Lecture) => lecture.course)
    lectures: Lecture[]

    @OneToMany(() => UserCourse, (UserCourse: UserCourse) => UserCourse.course)
    userCourses: UserCourse[]
}

export { Course }

import { Course } from "src/courses/courses.entity"
import { LectureFrequency } from "src/lectureFrequency/lectureFrequency.entity"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { UserCourse } from "../userCourses/userCourses.entity"

export enum UserRole {
    lecturer = "lecturer",
    student = "student",
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
        default: UserRole.student,
    })
    role: UserRole

    @OneToMany(() => Course, (course: Course) => course.lecturer)
    courses: Course[]

    @OneToMany(() => UserCourse, (UserCourse: UserCourse) => UserCourse.user)
    userCourses: UserCourse[]

    @OneToMany(() => LectureFrequency, (LectureFrequency: LectureFrequency) => LectureFrequency.user)
    lectureFrequency: LectureFrequency[]
}

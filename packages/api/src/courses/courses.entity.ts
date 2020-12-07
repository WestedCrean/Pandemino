import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { Lecture } from "../lectures/lectures.entity"
import { UserCourse } from "../userCourses/userCourses.entity"
import { User } from "../users/users.entity"

@Entity("courses")
class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string

    @Column()
    password: string;

    @Column({
        type: "text",
        default: "",
    })
    description: string

    @Column("timestamp")
    createdAt: Date

    @ManyToOne(() => User, (user: User) => user.courses, { onDelete: "NO ACTION" })
    @JoinColumn()
    lecturer: User

    @OneToMany(() => Lecture, (lecture: Lecture) => lecture.course)
    lectures: Lecture[]

    @OneToMany(() => UserCourse, (UserCourse: UserCourse) => UserCourse.course)
    userCourses: UserCourse[]
}

export { Course }

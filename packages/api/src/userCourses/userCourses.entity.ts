import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Course } from "../courses/courses.entity"
import { User } from "../users/users.entity"

@Entity("userCourses")
class UserCourse {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Course, (course: Course) => course.userCourses)
    course: Course

    @ManyToOne(() => User, (user: User) => user.userCourses)
    user: User
}

export { UserCourse }
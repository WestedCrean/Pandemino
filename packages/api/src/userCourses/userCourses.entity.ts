import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Course } from "../courses/courses.entity"
import { User } from "../users/users.entity"

@Entity("userCourses")
class UserCourse {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Course, (course: Course) => course.userCourses, { onDelete: "CASCADE" })
    @JoinColumn()
    course: Course

    @ManyToOne(() => User, (user: User) => user.userCourses, { onDelete: "NO ACTION" })
    @JoinColumn()
    user: User
}

export { UserCourse }

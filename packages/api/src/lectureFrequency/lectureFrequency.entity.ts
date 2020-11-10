import { Lecture } from "src/lectures/lectures.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Course } from "../courses/courses.entity"
import { User } from "../users/users.entity"

@Entity("lectureFrequency")
class LectureFrequency {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "int",
        default: 0,
    })
    status: number
    //0 stands for absend
    //1 present

    @ManyToOne(() => Lecture, (lecture: Lecture) => lecture.lectureFrequency, { onDelete: "CASCADE" })
    @JoinColumn()
    lecture: Lecture

    @ManyToOne(() => User, (user: User) => user.lectureFrequency, { onDelete: "NO ACTION" })
    @JoinColumn()
    user: User
}

export { LectureFrequency }

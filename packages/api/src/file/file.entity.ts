import { Lecture } from "src/lectures/lectures.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Course } from "../courses/courses.entity"
import { User } from "../users/users.entity"

@Entity("file")
class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    name: string


    @ManyToOne(() => Lecture, (lecture: Lecture) => lecture.file, { onDelete: "CASCADE" })
    @JoinColumn()
    lecture: Lecture

    @ManyToOne(() => User, (user: User) => user.lectureFrequency, { onDelete: "NO ACTION" })
    @JoinColumn()
    user: User
}

export { File }

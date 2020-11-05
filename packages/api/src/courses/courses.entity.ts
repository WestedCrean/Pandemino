import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Lecture } from "../lectures/lectures.entity"

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
}

export { Course }

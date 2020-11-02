import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Lecture } from "../lectures/lectures.entity"

@Entity("courses")
class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column() //ManyToOne -> users
    lecturer: string

    @OneToMany(() => Lecture, (lecture: Lecture) => lecture.course)
    lectures: Lecture[]
}

export { Course }
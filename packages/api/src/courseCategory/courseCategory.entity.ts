import { Course } from "src/courses/courses.entity"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm"

@Entity("courseCategory")
class CourseCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string

    @OneToMany(() => Course, (course: Course) => course.courseCategory)
    courses: Course[]
}

export { CourseCategory }

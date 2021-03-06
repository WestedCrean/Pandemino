import { Question } from "src/questions/questions.entity"
import { Lecture } from "src/lectures/lectures.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm"

@Entity("quiz")
class Quiz {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    //pytZam
    //pytOtw

    @OneToMany(() => Question, (questions: Question) => questions.quiz)
    questions: Question[]

    @ManyToOne(() => Lecture, (lecture: Lecture) => lecture.quiz, { onDelete: "CASCADE" })
    @JoinColumn()
    lecture: Lecture
}

export { Quiz }

import { Lecture } from "src/lectures/lectures.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm"


@Entity("quiz")
class ClosedQuestion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string



    @ManyToOne(() => Quiz, (quiz: Quiz) => quiz.closedQuestions, { onDelete: "CASCADE" })
    @JoinColumn()
    quiz: Quiz



}

export { ClosedQuestion }

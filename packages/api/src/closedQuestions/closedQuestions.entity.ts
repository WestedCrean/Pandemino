import { Quiz } from "src/quiz/quiz.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne,  } from "typeorm"


@Entity("closedQuestion")
class ClosedQuestion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({default: false})
    multiple: boolean


    @ManyToOne(() => Quiz, (quiz: Quiz) => quiz.closedQuestions, { onDelete: "CASCADE" })
    @JoinColumn()
    quiz: Quiz



}

export { ClosedQuestion }

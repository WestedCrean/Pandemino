import { ClosedQuestion } from "src/closedQuestions/closedQuestions.entity"
import { Quiz } from "src/quiz/quiz.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne,  } from "typeorm"


@Entity("variants")
class Variants {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({default: false})
    isTrue: boolean


    @ManyToOne(() => ClosedQuestion, (closedQuestion: ClosedQuestion) => closedQuestion.variants, { onDelete: "CASCADE" })
    @JoinColumn()
    closedQuestion: ClosedQuestion



}

export { Variants }

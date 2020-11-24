import { Question } from "src/questions/questions.entity"
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


    @ManyToOne(() => Question, (question: Question) => question.variants, { onDelete: "CASCADE" })
    @JoinColumn()
    questions: Question



}

export { Variants }

import { Quiz } from "src/quiz/quiz.entity"
import { Variants } from "src/variants/variants.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany,  } from "typeorm"


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

    @OneToMany(() => Variants, (variants: Variants) => variants.closedQuestion)
    variants: Variants[]

}

export { ClosedQuestion }

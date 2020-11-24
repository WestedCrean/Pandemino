import { Quiz } from "src/quiz/quiz.entity"
import { Variants } from "src/variants/variants.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany,  } from "typeorm"


@Entity("closedQuestion")
class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({default: false})
    multiple: boolean

    @Column({default: false})
    isOpen: boolean

    @ManyToOne(() => Quiz, (quiz: Quiz) => quiz.questions, { onDelete: "CASCADE" })
    @JoinColumn()
    quiz: Quiz

    @OneToMany(() => Variants, (variants: Variants) => variants.questions)
    variants: Variants[]

}

export { Question }

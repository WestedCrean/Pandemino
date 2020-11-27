import { Question } from "src/questions/questions.entity"
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Course } from "../courses/courses.entity"
import { User } from "../users/users.entity"

@Entity("userAnswer")
class UserAnswer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    answer: string

    @ManyToOne(() => Question, (question: Question) => question.userAnswer, { onDelete: "CASCADE" })
    @JoinColumn()
    question: Question

    @ManyToOne(() => User, (user: User) => user.userAnswer, { onDelete: "NO ACTION" })
    @JoinColumn()
    user: User
}

export { UserAnswer }

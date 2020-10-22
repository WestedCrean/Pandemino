import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ExclusionPolicy, Expose, Groups, Strategy } from "typeserializer"

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string
}

export default User

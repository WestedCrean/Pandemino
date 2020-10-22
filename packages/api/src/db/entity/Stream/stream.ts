import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Stream {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column("double")
    views: number

    @Column()
    isPublished: boolean

    @Column()
    isLive: boolean
}

export default Stream

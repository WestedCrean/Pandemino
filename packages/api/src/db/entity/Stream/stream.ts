import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("streams")
class Stream {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column("int")
    views: number

    @Column()
    isPublished: boolean

    @Column()
    isLive: boolean

    @Column()
    isWorthToWatch: boolean
}

export default Stream

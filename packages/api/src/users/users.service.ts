import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./users.entity"

import { app } from "firebase-admin"
import { UserCourse } from "src/userCourses/userCourses.entity"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserSchema: User): Promise<User> {
        const user = new User()

        user.firstName = createUserSchema.firstName
        user.lastName = createUserSchema.lastName
        user.email = createUserSchema.email

        await this.usersRepository.save(user)
        return user
    }

    async update(id: string, updateUserSchema: any): Promise<void> {
        let user: User

        try {
            user = await this.usersRepository.findOne(id);
        } catch {
            throw new Error(`Could not find user id ${updateUserSchema.id}`)
        }

        if(updateUserSchema.name !== null){
            user.title = updateUserSchema.title;
        }
        if(updateUserSchema.description !== null){
            user.firstName = updateUserSchema.firstName;
        }
        if(updateUserSchema.description !== null){
            user.lastName = updateUserSchema.lastName;
        }

        //FIXME: add more possible fields

        await this.usersRepository.save(user);
        
    }

    // FIXME: add pagination
    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id, { relations: ['userCourses', 'userCourses.course', 'userCourses.course.lecturer']});

            // .createQueryBuilder("user")
            // .leftJoinAndSelect("user.userCourses", "userCourses")
            // .innerJoinAndSelect("userCourses.course", "courses")
            // .where("user.id = :id", { id })
            // .getOne()
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email: email } })
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id)
    }
}

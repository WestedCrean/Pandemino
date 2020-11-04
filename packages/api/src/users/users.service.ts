
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity'

import { app } from 'firebase-admin'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserSchema: User): Promise<User> {
    const user = new User();
    
    user.firstName = createUserSchema.firstName
    user.lastName = createUserSchema.lastName
    user.email = createUserSchema.email

    await this.usersRepository.save(user);
    return user
  }

  async update(updateUserSchema: { id: number, firstName: string, lastName: string }) : Promise<User> {
      // FIXME: find id of current user
      // compare
      // if they match, update

      //(await firebaseInstance).
      const user = await this.usersRepository.findOne(updateUserSchema.id)

      if ( user ) {
        const {id, firstName, lastName} = updateUserSchema

        user.firstName = firstName
        user.lastName = lastName

        await this.usersRepository.update(id, { firstName, lastName })

        return user
      }
      // FIXME: throw error
      throw new Error(`Could not find user id ${updateUserSchema.id}`)
  } 

  // FIXME: add pagination
  findAll(): Promise<User[]> {
    return this.usersRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.userCourses", "userCourses").innerJoinAndSelect("userCourses.course", "courses").getMany();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
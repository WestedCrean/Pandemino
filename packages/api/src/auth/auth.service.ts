
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);  
    console.log({ email })  
    if (user) {
      console.log("Found user")
      return user;
    }
    console.log("Did not found user")

    // FIXME: else add to db
    try {
      console.log("Creating new user in database")
      const newUser = new User()
      newUser.email = email
      console.log({ newUser })  
      await this.usersService.create(newUser)

      return newUser;
    } catch (e) {
      console.log("Could not create user")
      console.log(e)
    }
    
  }
}
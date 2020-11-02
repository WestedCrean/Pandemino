
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
    if (user) {
      console.log("Found user")
      return user;
    }

    // FIXME: else add to db
    const newUser = new User()
    newUser.email = email
    
    await this.usersService.create(newUser)
    return newUser;
  }
}
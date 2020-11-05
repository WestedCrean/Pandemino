import { Injectable } from "@nestjs/common"

import { User } from "../users/users.entity"
import { UsersService } from "../users/users.service"

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email)
        if (user) {
            return user
        }
        const newUser = new User()
        newUser.email = email
        return await this.usersService.create(newUser)
    }
}

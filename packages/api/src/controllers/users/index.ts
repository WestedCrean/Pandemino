import { Body, JsonController as Controller, Get, Post, Req, Res } from "routing-controllers"
import { serialize } from "typeserializer"
import { createConnection } from "typeorm"
import { Connection } from "typeorm/connection/Connection"
import { validateOrReject } from "class-validator"
import { User } from "@db/entity/User/index"

import { UserNotFoundError, UserCreationError } from "@db/errors/usersErrors"

@Controller()
export class UserController {
    connection: Promise<Connection>

    constructor() {
        this.connection = createConnection()
    }

    @Get("/users")
    async getAll(@Req() request: any, @Res() response: any) {
        const connection = await this.connection
        const user = connection.manager.find(User)

        if (!user) throw new UserNotFoundError()

        return serialize(user)
    }

    @Post("/user")
    async post(@Body() body: any) {
        let user = new User()

        try {
            user.firstName = body.firstName
            user.lastName = body.lastName
            await validateOrReject(user)
        } catch (msg) {
            throw new UserCreationError(msg)
        }

        const connection = await this.connection
        await connection.manager.save(user)

        return serialize(user)
    }
}

export default UserController

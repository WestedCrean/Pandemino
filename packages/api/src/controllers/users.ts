import {
    Body,
    JsonController as Controller,
    Get,
    Post,
    Req,
    Res,
    Authorized,
    getMetadataArgsStorage,
} from "routing-controllers"
import { Repository, getRepository } from "typeorm"
import { validateOrReject } from "class-validator"
import { routingControllersToSpec } from "routing-controllers-openapi"

import { User } from "../db/entity/user"
import { UserNotFoundError, UserCreationError } from "../db/errors"

import logger from "../logger"

@Controller()
@Authorized()
export class UserController {
    userRepository: Repository<User>

    constructor() {
        this.userRepository = getRepository(User)
    }

    @Get("/users")
    async getAll() {
        const repository = await this.userRepository
        const userList = await repository.find()

        if (!userList) {
            throw new UserNotFoundError()
        }

        return userList
    }

    @Authorized()
    @Post("/user")
    async post(@Body() body: any) {
        let user = new User()

        try {
            user.firstName = body.firstName
            user.lastName = body.lastName
            logger.info("Validating")
            await validateOrReject(user)
            logger.info("Validated, didnt throw")
        } catch (msg) {
            logger.info("Err during validation")
            throw new UserCreationError(msg)
        }

        const repository = await this.userRepository
        await repository.save(user)

        return user
    }
}

// OpenApi schema generation
const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage)

export default UserController

import { RedisService } from "../services/Redis"
import { Router, Get, Inject, IContext, NextFunction, Post } from "rakkit"

import logger from "winston"

@Router("example")
export class UserRouter {
    @Inject()
    private _userRepositoryService: any

    @Get("/")
    async get(context: IContext, next: NextFunction) {
        logger.info(this._userRepositoryService)
        context.body = "Hello world"
        await next()
    }

    @Post("/")
    async post(context: IContext, next: NextFunction) {
        logger.info(this._userRepositoryService)
        logger.info({ req: context.request })
        context.body = "Hello world"
        await next()
    }

    @Get("/async")
    async asyncJob(context: IContext, next: NextFunction) {
        await new Promise((resolve) => {
            setTimeout(resolve, 5000)
        })
        context.body = "And voilà !"
        await next()
    }
}

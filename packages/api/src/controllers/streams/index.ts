import { Body, JsonController as Controller, Get, Post, Req, Res } from "routing-controllers"
import { createConnection } from "typeorm"
import { Connection } from "typeorm/connection/Connection"
import { serialize } from "typeserializer"
import { Stream } from "@db/entity/Stream/index"
import { validate, validateOrReject, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator"

import logger from "winston"

@Controller()
export class StreamController {
    connection: Promise<Connection>

    constructor() {
        this.connection = createConnection()
    }

    /**
     * Get single stream
     *
     * @param req
     * @param res
     */
    @Get("/streams/:id")
    async getSingle(@Req() req: any, @Res() res: any) {
        const connection = await this.connection
        return connection.manager.findOne(req.params.id)
    }

    /**
     * Get a list of streams
     *
     * @param req
     * @param res
     */
    @Get("/streams")
    async getAll(@Req() req: any, @Res() res: any) {
        const connection = await this.connection
        return serialize(connection.manager.find(Stream))
    }

    /**
     * Create a new stream session
     *
     * @param req
     * @param res
     */
    @Post("/streams")
    async post(@Body() body: any) {
        let stream = new Stream()

        try {
            stream.name = body.name
            stream.description = body.description
            stream.views = 0
            stream.isLive = false
            stream.isPublished = true

            logger.error("New stream object:")
            logger.error({ stream })

            await validateOrReject(stream)
        } catch (errors) {
            logger.error("Error with database:")
            logger.error(errors)
            throw new BadRequestError(errors)
        }

        const connection = await this.connection
        await connection.manager.save(stream)

        return stream
    }
}

export default StreamController

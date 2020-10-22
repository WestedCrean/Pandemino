import { Body, JsonController as Controller, Get, Post, Req, Res } from "routing-controllers"
import { serialize } from "typeserializer"
import { createConnection } from "typeorm"
import { Connection } from "typeorm/connection/Connection"

import { Stream } from "@db/entity/Stream/index"

@Controller()
export class StreamController {
    connection: Promise<Connection>

    constructor() {
        this.connection = createConnection()
    }

    /**
     * Get single stream
     *
     * @param request
     * @param response
     */
    @Get("/streams/:id")
    async getSingle(@Req() request: any, @Res() response: any) {
        const connection = await this.connection
        return connection.manager.find(Stream)
    }

    /**
     * Get a list of streams
     *
     * @param request
     * @param response
     */
    @Get("/streams")
    async getAll(@Req() request: any, @Res() response: any) {
        const connection = await this.connection
        return connection.manager.find(Stream)
    }

    /**
     * Create a new stream session
     *
     * @param request
     * @param response
     */
    @Post("/streams")
    async post(@Body() body: any) {
        const stream = new Stream()

        stream.name = body.name
        stream.description = body.description
        stream.views = 0
        stream.isLive = false
        stream.isPublished = true

        const connection = await this.connection
        await connection.manager.save(stream)

        return stream
    }
}

export default StreamController

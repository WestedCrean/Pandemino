import { Body, JsonController as Controller, Get, Post, Req, Res, BadRequestError, Param } from "routing-controllers"
import { getRepository, Repository } from "typeorm"
import { Stream } from "../../db/entity/Stream/index"
import { validateOrReject } from "class-validator"

import { StreamNotFoundError, StreamCreationError, DatabaseError } from "../../db/errors"

import logger from "winston"

@Controller()
export class StreamController {
    streamRepository: Repository<Stream>

    constructor() {
        this.streamRepository = getRepository(Stream)
    }

    /**
     * Get single stream
     *
     * @param req
     * @param res
     */
    @Get("/streams/:id")
    async getSingleStream(@Param("id") streamId: number): Promise<any> {
        const repository = await this.streamRepository
        const stream = await repository.findOne({ where: { id: streamId } })
        if (!stream) {
            throw new StreamNotFoundError()
        }
        return stream
    }

    /**
     * Get a list of streams
     *
     * @param req
     * @param res
     */
    @Get("/streams")
    async getAll(): Promise<any> {
        const repository = await this.streamRepository
        const streamList = await repository.find()
        return streamList
    }

    /**
     * Create a new stream session
     *
     * @param req
     * @param res
     */
    @Post("/streams")
    async post(@Body() body: any): Promise<any> {
        let stream = new Stream()

        try {
            stream.name = body.name
            stream.description = body.description
            stream.views = 0
            stream.isLive = false
            stream.isPublished = true

            logger.info("New stream object:" + JSON.stringify(stream))

            await validateOrReject(stream)
        } catch (err) {
            throw new StreamCreationError(err)
        }

        try {
            const repository = await this.streamRepository
            await repository.save(stream)
        } catch (err) {
            throw new DatabaseError(err)
        }

        return stream
    }
}

export default StreamController

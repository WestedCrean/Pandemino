import { Body, JsonController as Controller, Get, Post, Param, getMetadataArgsStorage, Authorized } from "routing-controllers"
import { getRepository, Repository } from "typeorm"
import { validateOrReject } from "class-validator"
import { OpenAPI, ResponseSchema, routingControllersToSpec } from "routing-controllers-openapi"

import { Stream } from "../../db/entity/Stream/index"
import { StreamNotFoundError, StreamCreationError, DatabaseError } from "../../db/errors"

import logger from "winston"

@Controller()
@Authorized()
export class StreamController {
    streamRepository: Repository<Stream>

    constructor() {
        this.streamRepository = getRepository(Stream)
    }

    @Get("/streams/:id")
    @OpenAPI({
        description: "Get single stream",
        responses: {
            "400": {
                description: "Bad request",
            },
            "404": {
                description: "Stream not found",
            },
            "200": {
                description: "Returned the stream specified by id",
            },
        },
    })
    async getSingleStream(@Param("id") streamId: number): Promise<any> {
        const repository = await this.streamRepository
        const stream = await repository.findOne({ where: { id: streamId } })
        if (!stream) {
            throw new StreamNotFoundError()
        }
        return stream
    }

    @Get("/streams")
    @OpenAPI({
        description: "Get a list of streams",
        responses: {
            "400": {
                description: "Bad request",
            },
            "200": {
                description: "Returned a list of streams",
            },
        },
    })
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
    @OpenAPI({
        description: "Get a list of streams",
        responses: {
            "400": {
                description: "Bad request",
            },
            "201": {
                description: "Created a stream",
            },
        },
    })
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

// OpenApi schema generation
const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage)

export default StreamController

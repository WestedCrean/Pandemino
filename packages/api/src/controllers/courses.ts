import {
    Body,
    JsonController as Controller,
    Get,
    Post,
    Param,
    getMetadataArgsStorage,
    Authorized,
} from "routing-controllers"
import { getRepository, Repository } from "typeorm"
import { validateOrReject } from "class-validator"
import { OpenAPI, routingControllersToSpec } from "routing-controllers-openapi"

import { Course, Stream } from "../db/entity"
import { StreamNotFoundError, StreamCreationError, DatabaseError } from "../db/errors"

import logger from "winston"

@Controller()
@Authorized()
export class CourseController {
    courseRepository: Repository<Course>

    constructor() {
        this.courseRepository = getRepository(Course)
    }

    @Get("/courses/:id")
    @OpenAPI({
        description: "Get single course",
        responses: {
            "400": {
                description: "Bad request",
            },
            "404": {
                description: "Course not found",
            },
            "200": {
                description: "Returned the stream specified by id",
            },
        },
    })
    async getSingleStream(@Param("id") courseId: number): Promise<any> {
        const repository = await this.courseRepository
        const course = await repository.createQueryBuilder("course")
            .leftJoinAndSelect("course.lectures", "stream")
            .where("course.id = :courseId", { courseId })
            .getOne();
        if (!course) {
            throw new StreamNotFoundError()
        }
        return course
    }

    @Get("/courses")
    @OpenAPI({
        description: "Get a list of courses",
        responses: {
            "400": {
                description: "Bad request",
            },
            "200": {
                description: "Returned a list of courses",
            },
        },
    })
    async getAll(): Promise<any> {
        const repository = await this.courseRepository
        const courseList = await repository.find()
        return courseList
    }

    /**
     * Create a new course 
     *
     * @param req
     * @param res
     */
    @Post("/courses")
    async post(@Body() body: any): Promise<any> {
        let course = new Course()

        try {
            course.name = body.name
            course.description = body.description
            course.lecturer = body.lecturer // FIXME: get user from user token

            await validateOrReject(course)
        } catch (err) {
            throw new StreamCreationError(err)
        }

        try {
            const repository = await this.courseRepository
            await repository.save(course)
        } catch (err) {
            throw new DatabaseError(err)
        }

        return course
    }
}

// OpenApi schema generation
const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage)

export default CourseController

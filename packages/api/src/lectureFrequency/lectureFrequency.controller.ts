import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { LectureFrequency } from "./lectureFrequency.entity"
import { LectureFrequencyService } from "./lectureFrequency.service"

@ApiTags("lectureFrequency")
@Controller("lectureFrequency")
@UseGuards(AuthGuard("firebase"))
export class LectureFrequencyController {
    constructor(private readonly lectureFrequencyService: LectureFrequencyService) {}

    @Post()
    create(@Body() createUser: any): Promise<LectureFrequency> {
        return this.lectureFrequencyService.create(createUser)
    }

    @Get()
    findAll(): Promise<LectureFrequency[]> {
        return this.lectureFrequencyService.findAll()
    }

    @Get(":courseId")
    findAllByCourseId(@Param("courseId") courseId: string): Promise<LectureFrequency[]> {
        return this.lectureFrequencyService.findAllByCourseId(courseId)
    }

    // @Get(":id")
    // findOne(@Param("id") id: string): Promise<LectureFrequency> {
    //     return this.lectureFrequencyService.findOne(id)
    // }

    @Get(":id/:lecture")
    findUserLecture(@Param("id") userId: string, @Param("lecture") lectureId: string): Promise<LectureFrequency> {
        return this.lectureFrequencyService.findUserLecture(userId, lectureId)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.lectureFrequencyService.remove(id)
    }
}

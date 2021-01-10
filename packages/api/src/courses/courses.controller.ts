import {
    Controller,
    Body,
    Get,
    Delete,
    Post,
    UseGuards,
    Param,
    Query,
    Put,
    HttpStatus,
    HttpException,
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { CoursesService } from "./courses.service"
import { Course } from "./courses.entity"

@ApiTags("courses")
@Controller("courses")
//@UseGuards(AuthGuard("firebase"))
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    create(@Body() createUser: any): Promise<Course> {
        return this.coursesService.create(createUser)
    }

    @Put(":id/live")
    toggleLiveStream(@Param("id") id: string, @Body() toggleLive: any): Promise<void> {
        const { isLive, lectureId } = toggleLive
        try {
            const courseId = parseInt(id)
            return this.coursesService.toggleLiveStream(courseId, isLive, lectureId)
        } catch (e) {
            console.log(e)
            throw new HttpException("Bad request: course id is not an integer", HttpStatus.FORBIDDEN)
        }
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateCourse: any): Promise<void> {
        return this.coursesService.update(id, updateCourse)
    }

    @Get()
    searchAll(@Query("query") query: string): Promise<Course[]> {
        return this.coursesService.searchAll(query)
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<Course> {
        return this.coursesService.findOne(id)
        try {
            return this.coursesService.findOne(id)
        } catch (e) {
            console.log(e)
            throw new HttpException("Bad request: course id is not an integer", HttpStatus.FORBIDDEN)
        }
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.coursesService.remove(id)
    }
}

import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { UserAnswerService } from "./UserAnswer.service"
import { UserAnswer } from "./UserAnswer.entity"


@ApiTags("userAnswer")
@Controller("userAnswer")
//@UseGuards(AuthGuard("firebase"))
export class UserAnswerController {
    constructor(private readonly userCoursesService: UserAnswerService) {}

    @Post()
    create(@Body() createUserAnswer: any): Promise<UserAnswer> {
        return this.userCoursesService.create(createUserAnswer)
    }

    @Get()
    findAll(): Promise<UserAnswer[]> {
        return this.userCoursesService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<UserAnswer> {
        return this.userCoursesService.findOne(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.userCoursesService.remove(id)
    }
}

import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { QuestionsService } from "./questions.service"
import { Question } from "./questions.entity"

@ApiTags("questions")
@Controller("questions")
@UseGuards(AuthGuard("firebase"))
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post()
    create(@Body() questionsService: any): Promise<Question> {
        return this.questionsService.create(questionsService)
    }

    @Get()
    findAll(): Promise<Question[]> {
        return this.questionsService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<Question> {
        return this.questionsService.findOne(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.questionsService.remove(id)
    }
}

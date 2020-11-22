import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { ClosedQuestionsService } from "./closedQuestions.service"
import { ClosedQuestion } from "./closedQuestions.entity"


@ApiTags("closedQuestions")
@Controller("closedQuestions")
//@UseGuards(AuthGuard('firebase'))
export class ClosedQuestionsController {
    constructor(private readonly closedQuestionsService: ClosedQuestionsService) {}

    @Post()
    create(@Body() createClosedQuestion: any): Promise<ClosedQuestion> {

        return this.closedQuestionsService.create(createClosedQuestion)
    }

    @Get()
    findAll(): Promise<ClosedQuestion[]> {
        return this.closedQuestionsService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<ClosedQuestion> {
        return this.closedQuestionsService.findOne(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.closedQuestionsService.remove(id)
    }
}

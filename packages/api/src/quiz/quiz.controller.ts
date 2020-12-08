import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { QuizService } from "./quiz.service"
import { Quiz } from "./quiz.entity"

@ApiTags("quiz")
@Controller("quiz")
@UseGuards(AuthGuard("firebase"))
export class QuizContoller {
    constructor(private readonly quizService: QuizService) {}

    @Post()
    create(@Body() createQuiz: any): Promise<File> {
        return this.quizService.create(createQuiz)
    }

    @Get()
    findAll(): Promise<Quiz[]> {
        return this.quizService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<Quiz> {
        return this.quizService.findOne(id)
    }

    @Get(":id/answers")
    findOneQuizAnswers(@Param("id") id: string): Promise<Quiz> {
        return this.quizService.findOneQuizAnswers(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.quizService.remove(id)
    }
}

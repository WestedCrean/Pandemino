import { Controller, Get, Delete, Put, Body, UseGuards, Param, Query, HostParam } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { UsersService } from "./users.service"
import { User } from "./users.entity"
import { QuizService } from "src/quiz/quiz.service"

@ApiTags("users")
@Controller("users")
@UseGuards(AuthGuard("firebase"))
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() updateUser: any): Promise<void> {
        await this.usersService.update(id, updateUser)
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<User> {
        return this.usersService.findOne(id)
    }

    @Get("/single/:email")
    findOneByEmail(@Param("email") email: string): Promise<User> {
        return this.usersService.findOneByEmail(email)
    }

    @Get(':id/:quiz')
    findUserWithQuiz(@Param("id")  userId: string, @Param("quiz") quiz: string):Promise<User[]>{
        return this.usersService.findUserWithQuiz(userId,quiz)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.usersService.remove(id)
    }
}

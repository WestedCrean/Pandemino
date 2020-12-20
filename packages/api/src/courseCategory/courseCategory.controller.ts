import { Controller, Body, Get, Delete, Post, UseGuards, Param, Query, Put } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import {CourseCategory} from "./courseCategory.entity"
import { CourseCategoryService } from "./courseCategory.service"


@ApiTags("courseCategory")
@Controller("courseCategory")
//@UseGuards(AuthGuard("firebase"))
export class CourseCategoryController {
    constructor(private readonly courseCategoryService: CourseCategoryService) {}

    @Post()
    create(@Body() createUser: any): Promise<CourseCategory> {
        return this.courseCategoryService.create(createUser)
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateCourse: any): Promise<void> {
        return this.courseCategoryService.update(id, updateCourse)
    }


    @Get(":id")
    findOne(@Param("id") id: string): Promise<CourseCategory> {
        return this.courseCategoryService.findOne(id)
    }

    @Get("")
    find(@Param("id") id: string): Promise<CourseCategory[]> {
        return this.courseCategoryService.findAll()
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.courseCategoryService.remove(id)
    }
}

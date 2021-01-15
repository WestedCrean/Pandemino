import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { FileService } from "./file.service"
import { File } from "./file.entity"
import { LectureFile } from "./lectureFile.entity"

@ApiTags("file")
@Controller("file")
@UseGuards(AuthGuard("firebase"))
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    create(@Body() createFile: any): Promise<File> {
        return this.fileService.create(createFile)
    }

    @Post("lecture")
    createLectureFile(@Body() createFile: any): Promise<LectureFile> {
        return this.fileService.createLectureFile(createFile)
    }

    @Get()
    findAll(): Promise<File[]> {
        return this.fileService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<File> {
        return this.fileService.findOne(id)
    }

    @Get("lecture/:id")
    findOneLectureFile(@Param("id") id: string): Promise<LectureFile> {
        return this.fileService.findOneLectureFile(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.fileService.remove(id)
    }
}

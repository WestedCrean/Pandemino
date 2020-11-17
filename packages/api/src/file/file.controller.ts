import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { FileService } from "./file.service"
import {File} from "./file.entity"

@ApiTags("file")
@Controller("file")
//@UseGuards(AuthGuard('firebase'))
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post()
    create(@Body() createFile: any): Promise<File> {
        return this.fileService.create(createFile)
    }

    @Get()
    findAll(): Promise<File[]> {
        return this.fileService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<File> {
        return this.fileService.findOne(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.fileService.remove(id)
    }
}

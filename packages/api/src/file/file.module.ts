import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../users/users.entity"
import { Lecture } from "src/lectures/lectures.entity"
import { LectureFile } from "./lectureFile.entity"

import { FileService } from "./file.service"
import { FileController } from "./file.controller"
import { File } from "./file.entity"

@Module({
    imports: [TypeOrmModule.forFeature([File, LectureFile, User, Lecture])],
    providers: [FileService],
    controllers: [FileController],
    exports: [FileService],
})
export class fileModule {}

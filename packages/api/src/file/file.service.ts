import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { File } from "./file.entity"
import { LectureFile } from "./lectureFile.entity"
import { Lecture } from "../lectures/lectures.entity"
import { User } from "../users/users.entity"

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>,
        @InjectRepository(LectureFile)
        private lectureFileRepository: Repository<LectureFile>,
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createFile: any): Promise<File> {
        let lecture: Lecture
        let user: User

        try {
            lecture = await this.lectureRepository.findOne(createFile.lectureId)
            user = await this.userRepository.findOne(createFile.userId)

            const file = new File()

            file.lecture = lecture
            file.user = user
            file.fireBaseUUID = createFile.fireBaseUUID
            file.originalName = createFile.originalName
            file.extension = createFile.extention

            await this.fileRepository.save(file)
            return file
        } catch (e) {
            return null
        }
    }

    async createLectureFile(createFile: any): Promise<LectureFile> {
        let lecture: Lecture
        let user: User

        try {
            lecture = await this.lectureRepository.findOne(createFile.lectureId)

            const file = new LectureFile()

            file.lecture = lecture
            file.fireBaseUUID = createFile.fireBaseUUID
            file.originalName = createFile.originalName
            file.extension = createFile.extention

            await this.lectureFileRepository.save(file)
            return file
        } catch (e) {
            return null
        }
    }

    findAll(): Promise<File[]> {
        return this.fileRepository.find({ relations: ["lecture", "user"] })
    }

    findOne(id: string): Promise<File> {
        return this.fileRepository.findOne(id, { relations: ["lecture", "user"] })
    }

    findOneLectureFile(id: string): Promise<LectureFile> {
        return this.lectureFileRepository.findOne(id, { relations: ["lecture"] })
    }

    async remove(id: string): Promise<void> {
        await this.fileRepository.delete(id)
    }
}

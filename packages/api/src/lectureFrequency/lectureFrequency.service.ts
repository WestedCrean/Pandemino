import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Lecture } from "../lectures/lectures.entity"
import { User } from "../users/users.entity"
import { LectureFrequency } from "./lectureFrequency.entity"
import { lectureFrequencyModule } from "./lectureFrequency.module"

@Injectable()
export class LectureFrequencyService {
    constructor(
        @InjectRepository(LectureFrequency)
        private lectureFrequencyRepository: Repository<LectureFrequency>,
        @InjectRepository(Lecture)
        private lectureRepository: Repository<Lecture>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserCourseSchema: any): Promise<LectureFrequency> {
        let lecture: Lecture
        let user: User

        try {
            lecture = await this.lectureRepository.findOne(createUserCourseSchema.lectureId)
            user = await this.userRepository.findOne(createUserCourseSchema.userId)

            const lectureFrequency = new LectureFrequency()

            lectureFrequency.lecture = lecture
            lectureFrequency.user = user
            lectureFrequency.status = createUserCourseSchema.status

            await this.lectureFrequencyRepository.save(lectureFrequency)
            return lectureFrequency
        } catch (e) {
            return null;
        }
    }

    findAll(): Promise<LectureFrequency[]> {
        return this.lectureFrequencyRepository.find();
    }

    findOne(id: string): Promise<LectureFrequency> {
        return this.lectureFrequencyRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.lectureFrequencyRepository.delete(id);
      }
}

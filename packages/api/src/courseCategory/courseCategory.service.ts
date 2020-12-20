import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../users/users.entity"
import { Repository } from "typeorm"
import {CourseCategory} from "./courseCategory.entity"

@Injectable()
export class CourseCategoryService {
    constructor(
        @InjectRepository(CourseCategory)
        private courseCategoryRepository: Repository<CourseCategory>,
    
    ) {}

    async create(createCourseSchema: any): Promise<CourseCategory> {
        return null
    }

    async update(id: string, updateCourseSchema: any): Promise<void> {

    }

    findAll(): Promise<CourseCategory[]> {
        return this.courseCategoryRepository.find()
    }

    findOne(id: string): Promise<CourseCategory> {
        return this.courseCategoryRepository.findOne(id)
    }


    async remove(id: string): Promise<void> {
        await this.courseCategoryRepository.delete(id)
    }
}

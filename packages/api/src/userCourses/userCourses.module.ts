import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoursesService } from './userCourses.service';
import { UserCoursesController } from './userCourses.controller'
import { UserCourse } from './userCourses.entity'
import { Course } from '../courses/courses.entity'
import { CoursesModule } from '../courses/courses.module'
import { UsersModule } from '../users/users.module'
import { User } from '../users/users.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse, User, Course]), CoursesModule, UsersModule],
  providers: [UserCoursesService],
  controllers: [UserCoursesController],
  exports: [UserCoursesService],
})
export class userCoursesModule {}

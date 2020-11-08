import { Controller, Body, Get, Delete, Post, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCoursesService } from './userCourses.service';
import { UserCourse } from './userCourses.entity'

@Controller('userCourses')
//@UseGuards(AuthGuard('firebase'))
export class UserCoursesController {
  constructor(
    private readonly userCoursesService: UserCoursesService,
  ) {}

  @Post()
  create(@Body() createUser: any): Promise<UserCourse> {
    return this.userCoursesService.create(createUser);
  }

  @Get()
  findAll(): Promise<UserCourse[]> {
    return this.userCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserCourse> {
    return this.userCoursesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userCoursesService.remove(id)
  }

}

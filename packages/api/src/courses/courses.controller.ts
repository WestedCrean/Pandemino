import { Controller, Body, Get, Delete, Post, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity'

@Controller('courses')
@UseGuards(AuthGuard('firebase'))
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
  ) {}

  @Post()
  create(@Body() createUser: any): Promise<Course> {
    return this.coursesService.create(createUser);
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id)
  }

}

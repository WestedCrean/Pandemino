import { Controller, Body, Get, Delete, Post, UseGuards, Param, Query, Put } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourse: any): Promise<void> {
    return this.coursesService.update(id, updateCourse);
  }


  @Get()
  searchAll(@Query('query') query: string): Promise<Course[]> {
    return this.coursesService.searchAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id)
  }

}

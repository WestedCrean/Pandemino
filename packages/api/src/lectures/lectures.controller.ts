import { Controller, Get, Post, Delete, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LecturesService } from './lectures.service';
import { Lecture } from './lectures.entity'

@Controller('lectures')
@UseGuards(AuthGuard('firebase'))
export class LecturesController {
  constructor(
    private readonly lecturesService: LecturesService,
  ) {}

  @Post()
  create(@Body() createLecture: any): Promise<Lecture> {
    return this.lecturesService.create(createLecture);
  }

  @Get()
  findAll(): Promise<Lecture[]> {
    return this.lecturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lecture> {
    return this.lecturesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.lecturesService.remove(id)
  }

}

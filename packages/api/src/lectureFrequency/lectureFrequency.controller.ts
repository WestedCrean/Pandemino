import { Controller, Body, Get, Delete, Post, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LectureFrequency } from './lectureFrequency.entity';
import { LectureFrequencyService } from './lectureFrequency.service';


@Controller('lectureFrequency')
//@UseGuards(AuthGuard('firebase'))
export class LectureFrequencyController {
  constructor(
    private readonly lectureFrequencyService: LectureFrequencyService,
  ) {}

  @Post()
  create(@Body() createUser: any): Promise<LectureFrequency> {
    return this.lectureFrequencyService.create(createUser);
  }

  @Get()
  findAll(): Promise<LectureFrequency[]> {
    return this.lectureFrequencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LectureFrequency> {
    return this.lectureFrequencyService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.lectureFrequencyService.remove(id)
  }

}
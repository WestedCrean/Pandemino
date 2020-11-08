import { Controller, Get, Post, Delete, UseGuards, Body, Param, Put} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LecturesService } from './lectures.service';
import { Lecture } from './lectures.entity'

@Controller('lectures')
//@UseGuards(AuthGuard('firebase'))
export class LecturesController {
  constructor(
    private readonly lecturesService: LecturesService,
  ) {}

  @Post()
  create(@Body() createLecture: any): Promise<Lecture> {
    return this.lecturesService.create(createLecture);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLecture: any): Promise<void> {
    return this.lecturesService.update(id, updateLecture);
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

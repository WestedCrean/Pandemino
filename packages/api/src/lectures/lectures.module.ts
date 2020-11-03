import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller'
import { Lecture } from './lectures.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  providers: [LecturesService],
  controllers: [LecturesController],
  exports: [LecturesService],
})
export class LecturesModule {}
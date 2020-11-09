import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity'
import { Lecture } from 'src/lectures/lectures.entity';
import { LectureFrequency } from './lectureFrequency.entity';
import { LectureFrequencyService } from './lectureFrequency.service';
import { LectureFrequencyController } from './lectureFrequency.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LectureFrequency, User, Lecture])],
  providers: [LectureFrequencyService],
  controllers: [LectureFrequencyController],
  exports: [LectureFrequencyService],
})
export class lectureFrequencyModule {}

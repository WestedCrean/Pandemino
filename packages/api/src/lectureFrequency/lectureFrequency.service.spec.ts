import { Test, TestingModule } from '@nestjs/testing';
import {LectureFrequencyService} from "./lectureFrequency.service";



describe('UserCoursesService', () => {
  let service: LectureFrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureFrequencyService],
    }).compile();

    service = module.get<LectureFrequencyService>(LectureFrequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

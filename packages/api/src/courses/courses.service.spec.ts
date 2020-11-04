import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursesService],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // for each method of CoursesService
  describe('method', () => {

    it('should create course in database', () => {

    });
  })

  describe('findAll', () => {

    it('should return a list of courses', () => {

    });
  })

  describe(':id/lectures', () => {

    it('should return a list of lectures from course', () => {

    });
  })
});

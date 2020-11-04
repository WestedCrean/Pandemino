import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity'

describe('CoursesService', () => {
  let service: CoursesService;
  let findOne = jest.fn()
  let find = jest.fn()
  let save = jest.fn()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: {
            findOne,
            find,
            save
          },
        }],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // for each method of CoursesService
  describe('when creating course', () => {
    describe('if all fields are filled', () => {

      let course = new Course()
      beforeEach(() => {
        save.mockReturnValue(Promise.resolve(course));
      })

      it('should create course succesfully', async () => {
        await expect(service.create({
          name: 'test',
          description: 'lorem ipsum',
          lecturer: 'dr Test'
        })).resolves.toBe(course)
      });
    })

    describe('if any required field is missing', () => { 
      beforeEach(() => {
        save.mockReturnValue(Promise.reject(new Error()));
      })
      it('should fail', async () => {
        await expect(service.create({
          name: 'test',
          description: 'lorem ipsum',
        })).rejects.toThrow()
      });
    })
  })

  describe('when getting all courses', () => {
    let coursesList = [new Course()]
    beforeEach(() => {
      find.mockReturnValue(Promise.resolve(coursesList));
    })

    it('should return a list of courses', async () => {
      const res = await service.findAll()
      expect(res).toEqual(coursesList)
    });
  })

  describe('when getting a course by id', () => {    
    describe('and course is matched', () => {
      let course: Course;
      beforeEach(() => {
        course = new Course();
        findOne.mockReturnValue(Promise.resolve(course));
      })
      it('should return a Course object', async () => {
        await expect(service.findOne('1')).resolves.toBe(course)
      })
    })

    describe('and course is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve({}));
      })
      it('should return an empty response', async () => {
        await expect(await service.findOne('1')).toEqual({})
      })
    })
  })
});

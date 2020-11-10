import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { CoursesService } from "./courses.service"
import { Course } from "./courses.entity"
import { Lecture } from "../lectures/lectures.entity"
import { LecturesService } from "../lectures/lectures.service"

describe("CoursesService", () => {
    let service: CoursesService
    let findOne = jest.fn()
    let find = jest.fn()
    let save = jest.fn()
    let createQueryBuilder = jest.fn(() => ({
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValue(Promise.resolve({})),
        getMany: jest.fn().mockReturnValue(Promise.resolve([{}])),
    }))

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                LecturesService,
                {
                    provide: getRepositoryToken(Lecture),
                    useValue: {
                        createQueryBuilder,
                    },
                },
                {
                    provide: getRepositoryToken(Course),
                    useValue: {
                        findOne,
                        find,
                        save,
                        createQueryBuilder,
                    },
                },
            ],
        }).compile()

        service = module.get<CoursesService>(CoursesService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    // for each method of CoursesService
    describe("when creating course", () => {
        describe("if all fields are filled", () => {
            let course = {
                name: "test",
                description: "lorem ipsum",
                lecturer: "dr Test",
            }
            beforeEach(() => {
                save.mockReturnValue(Promise.resolve(course))
            })

            it("should create course succesfully", async () => {
                await expect(service.create(course)).resolves.toEqual(course)
            })
        })

        describe("if any required field is missing", () => {
            beforeEach(() => {
                save.mockReturnValue(Promise.reject(new Error()))
            })
            it("should fail", async () => {
                await expect(
                    service.create({
                        name: "test",
                        description: "lorem ipsum",
                    }),
                ).rejects.toThrow()
            })
        })
    })

    describe("when getting all courses", () => {
        let coursesList = [new Course()]
        beforeEach(() => {
            find.mockReturnValue(Promise.resolve(coursesList))
        })

        it("should return a list of courses", async () => {
            const res = await service.findAll()
            expect(res).toEqual(coursesList)
        })
    })

    describe("when getting a course by id", () => {
        describe("and course is matched", () => {
            let course: Course
            let lecture: Lecture
            beforeEach(() => {
                course = new Course()
                lecture = new Lecture()
                findOne.mockReturnValue(Promise.resolve(course))
            })
            it("should return a Course object", async () => {
                await expect(service.findOne("1")).resolves.toEqual(course)
            })
        })

        describe("and course is not matched", () => {
            beforeEach(() => {
                findOne.mockReturnValue(Promise.resolve({}))
            })
            it("should return an empty response", async () => {
                await expect(await service.findOne("1")).toEqual({})
            })
        })
    })
})

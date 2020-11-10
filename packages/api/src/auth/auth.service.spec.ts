import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { AuthService } from "./auth.service"
import { User } from "../users/users.entity"
import { UsersService } from "../users/users.service"

describe("AuthService", () => {
    let service: AuthService
    let findOne = jest.fn()
    let save = jest.fn()

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOne,
                        save,
                    },
                },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    describe("if it can find user in database", () => {
        let user = new User()
        beforeEach(() => {
            findOne.mockReturnValue(Promise.resolve(user))
        })
        it("should return this user ", async () => {
            await expect(service.validateUser("test@email.com")).resolves.toBe(user)
        })
    })

    describe("if it cannot find user in database", () => {
        const user = {
            email: "test@email.com",
            firstName: undefined,
            lastName: undefined,
        }
        beforeEach(() => {
            findOne.mockReturnValue(Promise.resolve(undefined))
            save.mockReturnValue(Promise.resolve(user))
        })
        it("should create new user ", async () => {
            await expect(service.validateUser(user.email)).resolves.toEqual(user)
        })
    })
})

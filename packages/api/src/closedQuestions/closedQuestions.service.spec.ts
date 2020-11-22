import { Test, TestingModule } from "@nestjs/testing"
import { ClosedQuestionsService } from "./closedQuestions.service"


describe("UserCoursesService", () => {
    let service: ClosedQuestionsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClosedQuestionsService],
        }).compile()

        service = module.get<ClosedQuestionsService>(ClosedQuestionsService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})

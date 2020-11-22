import { Test, TestingModule } from "@nestjs/testing"
import { VariantsService } from "./variants.service"


describe("UserCoursesService", () => {
    let service: VariantsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VariantsService],
        }).compile()

        service = module.get<VariantsService>(VariantsService)
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })
})

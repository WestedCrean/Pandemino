import { Controller, Body, Get, Delete, Post, UseGuards, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AuthGuard } from "@nestjs/passport"
import { VariantsService } from "./variants.service"
import { Variants } from "./variants.entity"

@ApiTags("variants")
@Controller("variants")
@UseGuards(AuthGuard("firebase"))
export class VariantsController {
    constructor(private readonly variantService: VariantsService) {}

    @Post()
    create(@Body() createVariant: any): Promise<Variants> {
        return this.variantService.create(createVariant)
    }

    @Get()
    findAll(): Promise<Variants[]> {
        return this.variantService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string): Promise<Variants> {
        return this.variantService.findOne(id)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<void> {
        return this.variantService.remove(id)
    }
}

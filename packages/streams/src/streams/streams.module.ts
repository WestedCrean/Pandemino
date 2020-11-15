import { Module } from "@nestjs/common"
import { StreamsGateway } from "./streams.gateway"
import { StreamsService } from "./streams.service"
import { StreamsController } from "./streams.controller"

@Module({
    providers: [StreamsGateway, StreamsService],
    controllers: [StreamsController],
})
export class StreamsModule {}

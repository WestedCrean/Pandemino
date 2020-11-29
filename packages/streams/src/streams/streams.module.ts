import { Module } from "@nestjs/common"
import { StreamsGateway } from "./streams.gateway"
import { StreamsService } from "./streams.service"
import { StreamsController } from "./streams.controller"
import { UsersModule } from "../users/users.module"

@Module({
    imports: [UsersModule],
    providers: [StreamsGateway, StreamsService],
    controllers: [StreamsController],
})
export class StreamsModule {}

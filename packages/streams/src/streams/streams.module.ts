import { Module } from "@nestjs/common"
import { StreamsGateway } from "./streams.gateway"

@Module({
    providers: [StreamsGateway],
})
export class StreamsModule {}

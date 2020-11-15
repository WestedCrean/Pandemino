import { Module } from "@nestjs/common"
import { StreamsModule } from "./streams/streams.module"
import { StreamsController } from "./streams/streams.controller"
import { StreamsService } from "./streams/streams.service"

import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

@Module({
    imports: [
        StreamsModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "client"),
        }),
    ],
    controllers: [StreamsController],
    providers: [StreamsService],
})
export class AppModule {}

import { Module } from "@nestjs/common"
import { StreamsModule } from "./streams/streams.module"
import { UsersModule } from "./users/users.module"

import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

@Module({
    imports: [
        StreamsModule,
        UsersModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "client"),
        }),
    ],
})
export class AppModule {}

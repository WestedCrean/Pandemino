import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Logger } from "@nestjs/common"
import * as fs from "fs"
import { join } from "path"
const BASE_PATH = "/streams"

const httpsOptions = {
    key: fs.readFileSync(join(__dirname, "..", "/secrets/server.key")),
    cert: fs.readFileSync(join(__dirname, "..", "/secrets/server.cert")),
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        httpsOptions,
    })
    app.setGlobalPrefix(BASE_PATH)
    app.enableCors()
    await app.listen(5050)
    Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

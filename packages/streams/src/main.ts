import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Logger } from "@nestjs/common"
import { NestExpressApplication } from "@nestjs/platform-express"

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.set("trust proxy", 1)
    await app.listen(5050)
    Logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

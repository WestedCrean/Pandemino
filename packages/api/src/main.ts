declare const module: any
import fs from "fs"
import { join } from "path"
import { NestExpressApplication } from "@nestjs/platform-express"
import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import admin, { initializeApp } from "firebase-admin"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

import { AppModule } from "./app.module"

let configService: ConfigService
const BASE_PATH = "/api"

async function bootstrap() {
    console.log(`Environment: ${process.env.NODE_ENV}`)
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    //const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix(BASE_PATH)
    configService = app.get(ConfigService)

    // cross-origin requests, reverse proxy
    app.set("trust proxy", true)
    app.enableCors({
        origin: "",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    })

    // swagger documentation
    const options = new DocumentBuilder()
        .setTitle("Pandemino API")
        .setDescription("System zdalnego prowadzenia wykladow")
        .setVersion("1.0")
        .addTag("courses")
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup("swagger", app, document)

    const firebaseConfig = configService.get("firebaseConfig")
    // firebase
    initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        databaseURL: "https://pandemino.firebaseio.com",
    })

    // hot reload
    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }

    await app.listen(configService.get("port"))
}

bootstrap().then(() => console.log("Service listening on port: ", configService.get("port")))

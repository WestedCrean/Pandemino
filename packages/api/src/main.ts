declare const module: any;
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory,  } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import admin, { initializeApp } from 'firebase-admin'

import { AppModule } from './app.module';

let configService : ConfigService

async function bootstrap() {
  console.log(`Environment: ${process.env.NODE_ENV}`)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configService = app.get(ConfigService)

  // cors
  app.set('trust proxy', 1)
  app.enableCors({
    origin: '',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  // firebase
  initializeApp({
    credential: admin.credential.cert(configService.get('firebase')),
    databaseURL: "https://pandemino.firebaseio.com",
  })

  app.setGlobalPrefix('api');
  await app.listen(configService.get('port'));

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap().then(() => console.log('Service listening on port: ', configService.get('port')));

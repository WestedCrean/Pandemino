declare const module: any;
import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory,  } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import { Logger } from "nestjs-pino";

import { AppModule } from './app.module';

let config : any

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1)
  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  config = app.get(ConfigService)
  app.setGlobalPrefix('api');
  await app.listen(config.get('port'));

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap().then(() => console.log('Service listening on port: ', config.get('port')));

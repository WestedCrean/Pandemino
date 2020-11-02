import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino/dist'
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FirebaseModule } from './firebase/firebase.module';
import { CoursesModule } from './courses/courses.module';
import { LecturesModule } from './lectures/lectures.module';

import configuration from './config/configuration';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customSuccessMessage: (res) => {
          return 'request successful'
        },
        customErrorMessage: (res) => {
          return 'request failed'
        },
        level: 'info',
        prettyPrint: {
          crlf: false,
          colorize: true,
          translateTime: 'UTC:mm/dd/yyyy, h:MM:ss TT Z',
          messageKey: 'msg',
          messageFormat: false,
          ignore: 'pid,hostname,req',
        }
      }
    }),
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true
    }),
    FirebaseModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LecturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

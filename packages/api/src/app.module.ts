import { join } from 'path'
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
import { userCoursesModule } from './userCourses/userCourses.module';

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
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [
        join(__dirname, './**/*.entity{.ts,.js}')
      ],
      autoLoadEntities: true
    }),
    FirebaseModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    LecturesModule,
    userCoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
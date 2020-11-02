
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

import { FirebaseStrategy } from "./firebase.strategy";

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, FirebaseStrategy],
})
export class AuthModule {}
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, World!';
  }
  getAuthHello(): string {
    return 'Hello, Firebase!';
  }
}

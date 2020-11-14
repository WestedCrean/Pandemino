import { Module } from '@nestjs/common';
import { StreamsModule } from './streams/streams.module';

@Module({
  imports: [StreamsModule],
})

export class AppModule { }

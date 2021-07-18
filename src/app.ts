import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CharacterModule } from './Character';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), CharacterModule],
})
export class AppModule {}

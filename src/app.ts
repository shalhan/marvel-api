import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './Character';

@Module({
  imports: [ConfigModule.forRoot(), CharacterModule],
})
export class AppModule {}

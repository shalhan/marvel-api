import { Module } from '@nestjs/common';
import { CommonModule } from '../Common';
import { CharacterController } from './controllers/CharacterController';
import { CharacterService } from './services/CharacterService';

@Module({
  imports: [CommonModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}

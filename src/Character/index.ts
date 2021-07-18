import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { CommonModule } from '../Common';
import { CharacterController } from './controllers/CharacterController';
import { CharacterService, CharacterIntegrationService, CharacterIntegrationServiceWithCache } from './services';
import { CacheCharactersIdScheduler } from './schedulers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheAllCharactersIdController } from './controllers';
import { FETCH_ALL_CHARACTERS_ID_CLIENT } from './constants';

@Module({
  imports: [
    CommonModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ClientsModule.register([
      {
        name: FETCH_ALL_CHARACTERS_ID_CLIENT,
        transport: Transport.TCP,
        options: { port: 3210 },
      },
    ]),
  ],
  controllers: [CharacterController, CacheAllCharactersIdController],
  providers: [CharacterService, CharacterIntegrationService, CharacterIntegrationServiceWithCache, CacheCharactersIdScheduler],
  exports: [CacheCharactersIdScheduler],
})
export class CharacterModule {}

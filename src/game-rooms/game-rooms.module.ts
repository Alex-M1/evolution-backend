import { Module } from '@nestjs/common';
import { GameRoomsGateway } from './game-rooms.gateway';

@Module({
  providers: [GameRoomsGateway]
})
export class GameRoomsModule {}

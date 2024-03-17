import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { GameRoomsModule } from './game-rooms/game-rooms.module';
import configuration from './utils/configurations/config-service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [UserEntity],
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*.js'],
      database: 'db/database.sqlite',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    UserModule,
    GameRoomsModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}

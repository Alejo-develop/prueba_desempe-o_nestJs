import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { UsersModule } from '../users/users.module';
import { PlayerTournamentsModule } from '../player_tournaments/player_tournaments.module';

@Module({
  imports: [UsersModule, PlayerTournamentsModule, TypeOrmModule.forFeature([Tournament])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}

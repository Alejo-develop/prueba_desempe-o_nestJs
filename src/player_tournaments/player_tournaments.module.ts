import { Module } from '@nestjs/common';
import { PlayerTournamentsService } from './player_tournaments.service';
import { PlayerTournamentsController } from './player_tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerTournament } from './entities/player_tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerTournament])],
  controllers: [PlayerTournamentsController],
  providers: [PlayerTournamentsService],
  exports: [PlayerTournamentsService]
})
export class PlayerTournamentsModule {}

import { Injectable } from '@nestjs/common';
import { CreatePlayerTournamentDto } from './dto/create-player_tournament.dto';
import { UpdatePlayerTournamentDto } from './dto/update-player_tournament.dto';
import { GenericService } from '../common/services/base.service';
import { PlayerTournament } from './entities/player_tournament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerTournamentsService extends GenericService<PlayerTournament> {
  constructor(
    @InjectRepository(PlayerTournament) private readonly playerTournamentRepository: Repository<PlayerTournament>
  ){
    super(playerTournamentRepository)
  }

  async createPlayer( createPlayerTournamentDto: CreatePlayerTournamentDto ){
    return await super.create(createPlayerTournamentDto)
  }

  async findPlayerById(id: string) {
    return await this.playerTournamentRepository
      .createQueryBuilder('playerTournament')
      .leftJoinAndSelect('playerTournament.user', 'user')
      .where('playerTournament.id = :id', { id })
      .getOne();
  }

  async findAllUserPlayerTournaments(tournamentId: string) {
    return await this.playerTournamentRepository
      .createQueryBuilder('playerTournament')
      .leftJoinAndSelect('playerTournament.user', 'user')
      .where('playerTournament.tournamentId = :tournamentId', { tournamentId })
      .getMany();
  }

  async updatePlayerTournament( id: string, updatePlayerTournamentDto: UpdatePlayerTournamentDto){
    return await super.update(id, updatePlayerTournamentDto)
  }

  async deletePlayerTournament(id: string){
    return super.delete(id);
  }
}

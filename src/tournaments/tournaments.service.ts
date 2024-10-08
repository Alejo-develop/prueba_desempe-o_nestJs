import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { GenericService } from '../common/services/base.service';
import { Tournament } from './entities/tournament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerTournamentsService } from '../player_tournaments/player_tournaments.service';
import { PlayerTournament } from '../player_tournaments/entities/player_tournament.entity';

@Injectable()
export class TournamentsService extends GenericService<Tournament> {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private readonly playerTournamentService: PlayerTournamentsService,
  ) {
    super(tournamentRepository);
  }

  private calculateWinner(playerTournaments: PlayerTournament[]) {
    const result = playerTournaments.sort((a, b) => b.points - a.points);
    return result;
  }

  private calculateLosers(playerTournaments: PlayerTournament[]) {
    const result = playerTournaments.sort((a, b) => a.points - b.points);
    return result;
  }

  private paginateResults(results: any[], page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedResults = results.slice(startIndex, endIndex);

    return {
      totalResults: results.length,
      currentPage: page,
      totalPages: Math.ceil(results.length / limit),
      results: paginatedResults,
    };
  }

  async findWinnerAndPutWinner(tournamentId: string) {
    const playersTournaments =
      await this.playerTournamentService.findAllUserPlayerTournaments(
        tournamentId,
      );

    const tournamentFound = await this.findById(tournamentId);

    const results = this.calculateWinner(playersTournaments);
    const winner = results[0];
    const winnerId = winner.userId;
    return await this.tournamentRepository.update(tournamentId, {
      ...tournamentFound,
      winnerId: winnerId,
    });
  }

  async resultsMajorToMinor(tournamentId: string, page: number, limit: number) {
    const playersTournaments =
      await this.playerTournamentService.findAllUserPlayerTournaments(
        tournamentId,
      );

    if (page && limit) {
      const sortedResults = this.calculateWinner(playersTournaments);
      return this.paginateResults(sortedResults, page, limit);
    }

    return this.calculateWinner(playersTournaments);
  }

  async resultsMinorToMajor(tournamentId: string, page: number, limit: number) {
    const playersTournaments =
      await this.playerTournamentService.findAllUserPlayerTournaments(
        tournamentId,
      );

    if (page && limit) {
      const sortedResults = this.calculateLosers(playersTournaments);
      return this.paginateResults(sortedResults, page, limit);
    }

    return this.calculateLosers(playersTournaments);
  }

  async create(createTournamentDto: CreateTournamentDto) {
    return await super.create(createTournamentDto);
  }

  async findTournamentByName(name: string) {
    return await this.tournamentRepository
      .createQueryBuilder('tournament')
      .leftJoinAndSelect('tournament.user', 'user')
      .where('tournament.name = :name', {name})
      .getOne();
  }

  async findAllTournaments() {
    return super.findAll();
  }

  async findById(id: string) {
    return super.findOne(id);
  }

  async updateTournament(id: string, updateTournamentDto: UpdateTournamentDto) {
    return super.update(id, updateTournamentDto);
  }

  async deleteTournament(id: string) {
    return super.delete(id);
  }
}

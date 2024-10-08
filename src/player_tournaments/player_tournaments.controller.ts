import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayerTournamentsService } from './player_tournaments.service';
import { CreatePlayerTournamentDto } from './dto/create-player_tournament.dto';
import { UpdatePlayerTournamentDto } from './dto/update-player_tournament.dto';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/Roles.enum';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Player tournament')
@UseGuards(ApiKeyGuard)
@AuthDecorator(Role.ADMIN)
@Controller('player-tournaments')
export class PlayerTournamentsController {
  constructor(private readonly playerTournamentsService: PlayerTournamentsService) {}

  @Post()
  async create(@Body() createPlayerTournamentDto: CreatePlayerTournamentDto) {
    return await this.playerTournamentsService.create(createPlayerTournamentDto);
  }

  @Get('players/:tournamentid')
  async findAll(@Param('tournamentid') tournamentId: string) {
    return await this.playerTournamentsService.findAllUserPlayerTournaments(tournamentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playerTournamentsService.findPlayerById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayerTournamentDto: UpdatePlayerTournamentDto) {
    return await this.playerTournamentsService.update(id, updatePlayerTournamentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playerTournamentsService.deletePlayerTournament(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/Roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tournaments')
@UseGuards(ApiKeyGuard)
@AuthDecorator(Role.ADMIN)
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  async create(@Body() createTournamentDto: CreateTournamentDto) {
    return await this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  async findAll() {
    return await this.tournamentsService.findAllTournaments();
  }

  @Get('byname/:name')
  async findTournamentByName(@Param('name') name: string) {
    return await this.tournamentsService.findTournamentByName(name);
  }

  @Get('winner/:tournamentid')
  async findWinnerAndPut(@Param('tournamentid') tournamentid: string) {
    return await this.tournamentsService.findWinnerAndPutWinner(tournamentid);
  }

  @Get('maxtomin/:tournamentid')
  async findResultsMaxToMin(
    @Param('tournamentid') tournamentid: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return await this.tournamentsService.resultsMajorToMinor(
      tournamentid,
      page,
      limit,
    );
  }

  @Get('mintomax/:tournamentid')
  async findResultsMinToMax(
    @Param('tournamentid') tournamentid: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return await this.tournamentsService.resultsMinorToMajor(
      tournamentid,
      page,
      limit,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return await this.tournamentsService.updateTournament(
      id,
      updateTournamentDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tournamentsService.deleteTournament(id);
  }
}

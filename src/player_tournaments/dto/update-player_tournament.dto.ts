import { PartialType } from '@nestjs/swagger';
import { CreatePlayerTournamentDto } from './create-player_tournament.dto';

export class UpdatePlayerTournamentDto extends PartialType(CreatePlayerTournamentDto) {}

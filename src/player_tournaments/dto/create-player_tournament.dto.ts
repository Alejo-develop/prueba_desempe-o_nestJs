import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlayerTournamentDto {
    @IsString()
    userId: string;

    @IsString()
    tournamentId: string;

    @IsOptional()
    @IsNumber()
    points?: number
}

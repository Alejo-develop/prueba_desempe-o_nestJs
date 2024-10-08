import { IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {
    @IsString()
    name: string;

    @IsString()
    date: Date;

    @IsOptional()
    @IsString()
    winnerId?: string;
}

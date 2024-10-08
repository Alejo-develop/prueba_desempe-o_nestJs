import { IsNumber, IsOptional, IsString } from "class-validator";

export class registerDto{
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    secondName?: string;

    @IsString()
    lastName: string;

    @IsNumber()
    age: number;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    phoneNumber: string;
} 
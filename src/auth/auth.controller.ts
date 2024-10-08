import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto)
    }

    @Post('signup')
    async signup(@Body() registerDto: registerDto ){
        return await this.authService.register(registerDto)
    }
}
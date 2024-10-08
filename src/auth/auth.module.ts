import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwt.secretKey";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true, 
            secret: jwtConstants.secret_key,
            signOptions: { expiresIn: '1h'}
        }),
    ],
    controllers: [ AuthController ],
    providers: [ AuthService ]
})
export class AuthModule {}
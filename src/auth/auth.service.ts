import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/common/enum/Roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServices: JwtService,
    private readonly userServices: UsersService,
  ) {}

  private async encryptPassword(password: string) {
    const hashPassword = await bcryptjs.hash(password, 10);
    return hashPassword;
  }

  private comparePasswords(
    password: string,
    newPassword: string,
  ): Promise<boolean> {
    const isValidPassword = bcryptjs.compare(newPassword, password)
    if(!isValidPassword) throw new UnauthorizedException('password is wrong')
    
    return isValidPassword;
  }

  private async verifyIfUserAlreadyExist(email: string){
    const userFound = await this.userServices.finOneByEmail(email) 

    if(userFound) throw new ConflictException('User already exist')
  }

  async register(registerDto: registerDto){
    await this.verifyIfUserAlreadyExist(registerDto.email)
    const hashpassword = await this.encryptPassword(registerDto.password)
    
    return await this.userServices.create({
        ...registerDto,
        password: hashpassword
    })
  }

  private async createToken(id: string, email: string, role: Role) {
    const payload = { id, email, role };
    const token = await this.jwtServices.signAsync(payload);

    return token;
  }

  async login(loginDto: LoginDto){
    const userFound = await this.userServices.findUserByEmailWithPassword(loginDto.email)
    if(!userFound) throw new NotFoundException('Email not found')

    this.comparePasswords(loginDto.password, userFound.password)

    return await this.createToken(userFound.id, loginDto.email, userFound.role)
  }
}

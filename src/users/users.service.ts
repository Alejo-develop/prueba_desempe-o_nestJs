import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { registerDto } from '../auth/dto/register.dto';
import { GenericService } from '../common/services/base.service';
import { UpdateUserDto } from './dto/updateUser.dto';


@Injectable()
export class UsersService extends GenericService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){
    super(userRepository)
  }

  async finOneByEmail(email: string) {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async create(registerDto: registerDto) {
    return await this.userRepository.save(registerDto)
  }

  async findUserByEmailWithPassword(email: string){
    return await this.userRepository.findOne({
      where: {email: email},
      select: [
        'email',
        'password'
      ]
    })
  }

  async findAllUsers(){
    return super.findAll()
  }

  async findById(id: string): Promise<User> {
    return super.findOne(id);
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<User> {
    return super.update(id, updateDto);
  }

  async deleteUser(id: string): Promise<User> {
    return super.delete(id);
  }
}

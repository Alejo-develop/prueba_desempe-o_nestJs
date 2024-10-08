import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/Roles.enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(ApiKeyGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userServices: UsersService) {}

  @AuthDecorator(Role.ADMIN)
  @Get()
  async findAll() {
    return await this.userServices.findAllUsers();
  }

  @AuthDecorator(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userServices.findById(id);
  }

  @AuthDecorator(Role.PLAYER)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userServices.updateUser(id, updateUserDto);
  }

  @AuthDecorator(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userServices.deleteUser(id);
  }
}

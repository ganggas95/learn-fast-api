import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './serializers/user.serializers';
import { LoginGuard } from 'src/login/login.guard';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoginGuard)
  @Post('list')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return new UserResponse(await this.userService.create(createUserDto));
  }

  @UseGuards(LoginGuard)
  @Get('list')
  async findAll(): Promise<UserResponse[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserResponse(user));
  }

  @UseGuards(LoginGuard)
  @Get(':id/detail')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    return new UserResponse(await this.userService.findOne(id));
  }

  @UseGuards(LoginGuard)
  @Patch(':id/detail')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return new UserResponse(await this.userService.update(id, updateUserDto));
  }

  @UseGuards(LoginGuard)
  @Delete(':id/detail')
  async remove(@Param('id') id: string): Promise<UserResponse> {
    return new UserResponse(await this.userService.remove(id));
  }
}

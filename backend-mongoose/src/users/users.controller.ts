import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Res,
  Param,
  // Inject, Logger, LoggerService
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInput } from './dto/user.input';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async Index(): Promise<User[]> {
    const users = await this.usersService.findAll();
    console.log('users.controller | Index | users:', users);
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    console.log('users.controller | findOne | user:', user);
    return user;
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    console.log('users.controller | findOne | user:', user);
    return user;
  }

  @Post()
  async create(@Body() createUserDTO: UserInput) {
    console.log('users.controller | create');
    const user = await this.usersService.create(createUserDTO);
    return user;
  }

  @Put(':id')
  async update(@Body() updateUserDTO: UserInput, @Param('id') id: string) {
    console.log('users.controller | update');
    const user = await this.usersService.update(updateUserDTO, id);
    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log('users.controller | delete');
    const user = await this.usersService.delete(id);
    return user;
  }
}

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
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async Index(): Promise<User[]> {
    const users = await this.usersService.findAll();
    console.log('users.controller | Index | users:', users);
    return users;
  }

  @Get('id')
  async findOne(username: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    console.log('users.controller | findOne | user:', user);
    return user;
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.create(createUserDTO);
    console.log('users.controller | create | user:', user);
    return user;
  }
}

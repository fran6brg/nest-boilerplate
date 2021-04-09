// Common
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

// services
import { ProgramsService } from './programs.service';

// dto
import { CreateProgramDTO, UpdateProgramDTO } from './dto/program.dto';

// models
import { Program } from './models/program.model';

// guards
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  async Index(): Promise<Program[]> {
    console.log('programs.controller | Index');
    return await this.programsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Program> {
    console.log('programs.controller | findOne');
    return await this.programsService.findOne(id);
  }

  @Post()
  async create(@Body() createProgramDTO: CreateProgramDTO): Promise<Program> {
    console.log('programs.controller | Create');
    return await this.programsService.create(createProgramDTO);
  }

  @Put(':id')
  async update(
    @Body() updateProgramDTO: UpdateProgramDTO,
    @Param('id') id: string,
  ): Promise<Program> {
    console.log('programs.controller | Update');
    return await this.programsService.update(updateProgramDTO, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): string {
    return `Delete id: ${id}`;
  }
}

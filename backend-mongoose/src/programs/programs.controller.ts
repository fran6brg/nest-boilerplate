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

// OpenAPI
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';

// Program
import { ProgramsService } from './programs.service';

// Auth
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// Models
import { ResponseObject } from 'src/models/response.model';
import {
  Program,
  CreateProgramDTO,
  CreateProgramBody,
  UpdateProgramDTO,
  UpdateProgramBody,
  ProgramResponse,
} from 'src/models/program.model';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @ApiOkResponse({ description: 'List all programs' })
  @Get()
  async Index(): Promise<Program[]> {
    console.log('programs.controller | Index');
    return await this.programsService.findAll();
  }

  @Get('id')
  async findOne(): Promise<Program[]> {
    console.log('programs.controller | findOne');
    return await this.programsService.findAll();
  }

  @ApiCreatedResponse({ description: 'Create program' })
  @ApiBody({ type: CreateProgramBody })
  @Post()
  async create(@Body() createProgramDTO: CreateProgramDTO) {
    console.log('programs.controller | Create');
    return await this.programsService.create(createProgramDTO);
  }

  @ApiOkResponse({ description: 'Update program' })
  @ApiBody({ type: UpdateProgramBody })
  @Put(':id')
  async update(
    @Body() updateProgramDTO: UpdateProgramDTO,
    @Param('id') id: string,
  ): Promise<ResponseObject<'program', ProgramResponse>> {
    console.log('programs.controller | Update');
    return await this.programsService.update(updateProgramDTO, id);
  }

  @ApiOkResponse({ description: 'Delete program' })
  @Delete(':id')
  delete(@Param('id') id: string): string {
    return `Delete id: ${id}`;
  }
}

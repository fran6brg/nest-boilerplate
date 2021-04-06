import {
    Controller,
    Get, Post, Put, Delete,
    Body, Req, Res, Param, UseGuards,
    // Inject, Logger, LoggerService
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './schemas/program.schema';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramsController {
    constructor(
        private readonly programsService: ProgramsService,
        // @Inject(Logger) private readonly logger: LoggerService,
    ) {}

    @Get()
    async Index(): Promise<Program[]> {
        // this.logger.log("GET /programs");
        console.log("programs.controller | Index");
        return await this.programsService.findAll();
    }

    @Get('id')
    async findOne(): Promise<Program[]> {
        console.log("programs.controller | findOne");
        return await this.programsService.findAll();
    }

    @Post()
    async create(@Body() createProgramDto: CreateProgramDto) {
        console.log("programs.controller | Create");
        return await this.programsService.create(createProgramDto);
    }

    // @Put(':id')
    // update(@Body() updateProgramDto: UpdateProgramDto, @Param('id') id: string): string {
    //     return `Name: ${updateProgramDto.name}`;
    // }

    // @Delete(':id')
    // delete(@Param('id') id: string): string {
    //     return `Delete id: ${id}`;
    // }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Program, ProgramDocument } from './schemas/program.schema';
import { CreateProgramDTO } from './dto/create-program.dto';
import { NewProgramInput } from './dto/new-program.input';

@Injectable()
export class ProgramsService {
  // Once you've registered the schema, you can inject a model into the service using the @InjectModel() decorator
  constructor(
    @InjectModel(Program.name) private programModel: Model<ProgramDocument>,
  ) {}

  async findAll(): Promise<Program[]> {
    return await this.programModel.find().exec();
  }

  async create(createProgramDTO: NewProgramInput): Promise<Program> {
    try {
      const createdProgram = new this.programModel(createProgramDTO);
      await createdProgram.save();
      return createdProgram;
    } catch (error) {
      console.log('service | error:', error);
    }
  }

  async update(updateProgramDTO: NewProgramInput): Promise<Program> {
    try {
      const updatedProgram = new this.programModel(updateProgramDTO);
      await updatedProgram.save();
      return updatedProgram;
    } catch (error) {
      console.log('service | error:', error);
    }
  }
}

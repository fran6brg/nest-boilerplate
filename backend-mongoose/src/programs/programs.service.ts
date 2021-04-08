import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Program, ProgramDocument } from './schemas/program.schema';
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

  async findOne(id: string): Promise<Program | undefined> {
    console.log('programs.service | findOne');
    const program: Program = await this.programModel.findOne({ _id: id });
    return program;
  }

  async findbyName(name: string): Promise<Program> {
    return await this.programModel.findOne({
      name,
    });
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

  async update(
    updateProgramDTO: NewProgramInput,
    id: string,
  ): Promise<Program> {
    try {
      // update
      const updatedUser = await this.programModel.findOneAndUpdate(
        { _id: id },
        {
          ...updateProgramDTO,
        },
      );

      // return
      return updatedUser;
    } catch (error) {
      console.log('service | error:', error);
    }
  }
}

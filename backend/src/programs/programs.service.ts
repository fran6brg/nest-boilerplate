import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// inputs
import { NewProgramInput } from './inputs/new-program.input';

// schemas
import { Program, ProgramDocument } from './schemas/program.schema';

@Injectable()
export class ProgramsService {
  /**
   * Constructor
   * @param {Model<ProgramDocument>} programModel
   */
  constructor(
    @InjectModel(Program.name) private programModel: Model<ProgramDocument>,
  ) {}

  /**
   * Fetches all the programs
   */
  async findAll(): Promise<Program[]> {
    return await this.programModel.find().exec();
  }

  /**
   * Fetches a program by its id
   * @param {number} id
   */
  async findOne(id: string): Promise<Program | undefined> {
    console.log('programs.service | findOne');
    const program: Program = await this.programModel.findOne({ _id: id });
    return program;
  }

  /**
   * Fetches a program by its name
   * @param {string} name
   */
  async findbyName(name: string): Promise<Program> {
    return await this.programModel.findOne({
      name,
    });
  }

  /**
   * Create a program with NewProgramInput fields
   * @param {NewProgramInput} createProgramDTO
   * @returns {Promise<Program>}
   */
  async create(createProgramDTO: NewProgramInput): Promise<Program> {
    try {
      const createdProgram = new this.programModel(createProgramDTO);
      await createdProgram.save();
      return createdProgram;
    } catch (error) {
      console.log('service | error:', error);
    }
  }

  /**
   * Fetch a program by its id and update it with createProgramDTO fields
   * @param {NewProgramInput} createProgramDTO
   * @param {number} id
   * @returns {Promise<Program>}
   */
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

  /**
   * Fetch a program by its id and delete it
   * @param {number} id
   * @returns {Promise<Program>}
   */
  async delete(id: string) {
    console.log('programs.service | delete');
    const program = await this.programModel.findOne({ _id: id });

    if (program === undefined || program === null) {
      throw new HttpException(`Program doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return await this.programModel.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
  }
}

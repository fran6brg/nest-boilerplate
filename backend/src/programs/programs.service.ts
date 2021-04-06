import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Program, ProgramDocument } from './schemas/program.schema';
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramsArgs } from './dto/programs.args';
import { NewProgramInput } from './dto/new-program.input';

@Injectable()
export class ProgramsService {
    // Once you've registered the schema, you can inject a model into the service using the @InjectModel() decorator
    constructor(@InjectModel(Program.name) private programModel: Model<ProgramDocument>) {}

    async create(createProgramDto: NewProgramInput): Promise<Program> {
        try {
            const createdProgram = new this.programModel(createProgramDto);
            await createdProgram.save();
            return createdProgram;
        }
        catch (error) {
            console.log("service | error:", error);
        }
    }

    async findAll(): Promise<Program[]> {
        return this.programModel.find().exec();
    }
}

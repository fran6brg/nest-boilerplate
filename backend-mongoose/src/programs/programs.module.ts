import { Module } from '@nestjs/common';
// Mongo
import { MongooseModule } from '@nestjs/mongoose';
// User
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { ProgramsResolver } from './programs.resolver';
import { Program, ProgramSchema } from './schemas/program.schema';

@Module({
  /**
   * forFeature()
   * Method to configure the module, including defining which models should be registered in the current scope.
   * Provided by the MongooseModule.
   */
  imports: [
    MongooseModule.forFeature([
      {
        name: Program.name,
        schema: ProgramSchema,
      }
    ]),
  ],

  /**
   * Controllers
   */
  controllers: [ProgramsController],

  /**
   * Providers
   */
  providers: [
    ProgramsResolver,
    ProgramsService,
  ],
})

export class ProgramsModule {}

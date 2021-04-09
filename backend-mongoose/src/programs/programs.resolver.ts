import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';

// services
import { ProgramsService } from './programs.service';

// models
import { Program } from './models/program.model';

// inputs
import { NewProgramInput } from './inputs/new-program.input';

// args
import { ProgramsArgs } from './inputs/args/programs.args';
import { NotFoundException } from '@nestjs/common';

const pubSub = new PubSub();

/**
 * Apollo Server needs to know how to populate data for every field in your
 * schema so that it can respond to requests for that data.
 * To accomplish this, it uses resolvers.
 *
 * A resolver is a function that's responsible for populating the data for
 * a single field in your schema. It can populate that data in any way you
 * define, such as by fetching data from a back-end database or a third-party API.
 */

@Resolver((of) => Program)
export class ProgramsResolver {
  constructor(private readonly programsService: ProgramsService) {}

  @Query((returns) => [Program])
  async programs(@Args() programsArgs: ProgramsArgs): Promise<Program[]> {
    console.log('programs.resolver | query | programs');
    return await this.programsService.findAll();
  }

  @Query((returns) => Program)
  async program(@Args('id') id: string): Promise<Program> {
    console.log('programs.resolver | query | program | id:', id);
    const program = await this.programsService.findOne(id);
    if (!program) {
      throw new NotFoundException(id);
    }
    return program;
  }

  @Mutation((returns) => Program)
  async addProgram(
    @Args('newProgramData') newProgramData: NewProgramInput,
  ): Promise<Program> {
    console.log(
      'programs.resolver | query | addProgram | newProgramData:',
      newProgramData,
    );
    const program = await this.programsService.create(newProgramData);
    pubSub.publish('programAdded', { programAdded: program });
    return program;
  }

  @Mutation((returns) => Boolean)
  async deleteProgram(@Args('id') id: string) {
    return this.programsService.delete(id);
  }

  @Subscription((returns) => Program)
  programAdded() {
    return pubSub.asyncIterator('programAdded');
  }
}

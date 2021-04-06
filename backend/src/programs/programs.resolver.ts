import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewProgramInput } from './dto/new-program.input';
import { ProgramsArgs } from './dto/programs.args';
import { Program } from './models/program.model';
import { ProgramsService } from './programs.service';

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

@Resolver(of => Program)
export class ProgramsResolver {
  constructor(private readonly programsService: ProgramsService) {}

  @Query(returns => [Program])
  async programs(@Args() programsArgs: ProgramsArgs): Promise<Program[]> {
    return await this.programsService.findAll();
  }

  // @Query(returns => Program)
  // async program(@Args('id') id: string): Promise<Program> {
  //   const program = await this.programsService.findOneById(id);
  //   if (!program) {
  //     throw new NotFoundException(id);
  //   }
  //   return program;
  // }

  @Mutation(returns => Program)
  async addProgram(
    @Args('newProgramData') newProgramData: NewProgramInput,
  ): Promise<Program> {
    const program = await this.programsService.create(newProgramData);
    pubSub.publish('programAdded', { programAdded: program });
    return program;
  }

//   @Mutation(returns => Boolean)
//   async removeProgram(@Args('id') id: string) {
//     return this.programsService.remove(id);
//   }

  @Subscription(returns => Program)
  programAdded() {
    return pubSub.asyncIterator('programAdded');
  }
}

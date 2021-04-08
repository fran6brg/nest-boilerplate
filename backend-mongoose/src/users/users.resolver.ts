import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { UserInput } from './dto/user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user.model';
import { UsersService } from './users.service';

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

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => [User])
  async users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUserData') newUserData: UserInput): Promise<User> {
    const user: User = await this.usersService.create(newUserData);
    // pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  @Subscription((returns) => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }
}

import { Module } from '@nestjs/common';
// Mongo
import { MongooseModule } from '@nestjs/mongoose';
// User
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  /**
   * Imports
   */
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
  ],

  /**
   * Controllers
   */
  controllers: [UsersController],

  /**
   * Providers
   */
  providers: [
    UsersResolver,
    UsersService,
  ],

  /**
   * Exports
   */
  exports: [UsersService],
})
export class UsersModule {}

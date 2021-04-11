import { Model } from 'mongoose';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserInput } from './dto/user.input';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  // Once you've registered the schema, you can inject a model into the service using the @InjectModel() decorator
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   *
   */
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  /**
   *
   * @param id
   */
  async findOne(id: string): Promise<User | undefined> {
    console.log('users.service | findOne');
    return await this.userModel.findOne({
      _id: id,
    });
  }

  /**
   *
   * @param username
   */
  async findByUsername(username: string): Promise<User | undefined> {
    try {
      console.log('users.service | findByUsername');
      const user = await this.userModel.findOne({ username }).exec();

      if (!user)
        throw new HttpException(
          `User with username ${username} does not exist`,
          HttpStatus.NOT_FOUND,
        );

      return user;
    } catch (error) {
      console.log('error:', error);
    }
  }

  /**
   *
   * @param createUserDTO
   */
  async create(createUserDTO: UserInput): Promise<User> {
    try {
      console.log('users.service | create');
      const createdUser = new this.userModel(createUserDTO);
      const errors = await validate(createdUser);
      console.log('users.service | errors:', errors);
      if (errors.length > 0) {
        throw new BadRequestException('Validation failed');
      }
      return await createdUser.save();
    } catch (error) {
      console.log('users.service | error:', error);
    }
  }

  /**
   *
   * @param updateUserDTO
   * @param id
   */
  async update(updateUserDTO: UserInput, id: string): Promise<User> {
    try {
      console.log('users.service | findOne');
      // update
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        { ...updateUserDTO },
        { useFindAndModify: false },
      );

      // return
      return updatedUser;
    } catch (error) {
      console.log('service | error:', error);
    }
  }

  async delete(id: string) {
    console.log('users.service | delete');
    const user = await this.userModel.findOne({ _id: id });

    if (user === undefined || user === null) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return await this.userModel.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
  }
}

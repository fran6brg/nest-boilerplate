import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersArgs } from './dto/users.args';
import { NewUserInput } from './dto/new-user.input';

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
     * @param username
     */
    async findOne(username: string): Promise<User | undefined> {
        console.log("users.service | findOne");
        const users = await this.userModel.find().exec();
        const user = users.find(user => user.username === username);
        // console.log("                >>> users.length:", users.length, "| user:", user);
        return user;
    }

    /**
     * 
     * @param username 
     */
    async findByUsername(username: string): Promise<User | undefined> {
        try {
            console.log("users.service | findByUsername");
            const user = await this.userModel.findOne({username}).exec();

            if (!user)
                throw new HttpException(`User with username ${username} does not exist`, HttpStatus.NOT_FOUND);

            return user;
        }
        catch (error) {
            console.log("error:", error);
        }
    }

    /**
     * 
     * @param createUserDto 
     */
    async create(createUserDto: NewUserInput): Promise<User> {
        try {
            const createdUser = new this.userModel(createUserDto);
            await createdUser.save();
            return createdUser;
        }
        catch (error) {
            console.log("users.service | error:", error);
        }
    }

}
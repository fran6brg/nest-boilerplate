import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';

const prefix: string = 'users.inputs:'

@InputType()
export class UserInput {
  @Field()
  @MinLength(5, { message: `${prefix} username min length is 5` })
  @MaxLength(10)
  @IsNotEmpty()
  readonly username: string;

  @Field()
  @MinLength(5, { message: `${prefix} password minLength is 5` })
  @MaxLength(10)
  @IsNotEmpty()
  readonly password: string;

  @Field()
  @IsNotEmpty()
  @Max(10, { message: `${prefix} age max is 10` })
  @Min(5, { message: `${prefix} age min is 5` })
  readonly age: number;
}

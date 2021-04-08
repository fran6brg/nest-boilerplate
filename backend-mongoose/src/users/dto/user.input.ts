import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @Min(5, { message: 'userId is too low' })
  @Max(10)
  @IsNotEmpty()
  readonly userId!: number;

  @Field()
  @MinLength(5, { message: 'username is too short' })
  @MaxLength(10)
  @IsNotEmpty()
  readonly username!: string;

  @Field()
  @MinLength(5, { message: 'password is too short' })
  @MaxLength(10)
  @IsNotEmpty()
  readonly password!: string;
}

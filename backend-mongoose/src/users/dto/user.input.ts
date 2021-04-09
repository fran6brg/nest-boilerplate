import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @Min(5, { message: 'damn, age is too low, must be >= 5' })
  @Max(10, { message: 'damn, age is too low, must be <= 10' })
  @IsNotEmpty()
  readonly age!: number;

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

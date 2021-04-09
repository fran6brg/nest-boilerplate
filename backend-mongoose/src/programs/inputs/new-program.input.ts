import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewProgramInput {
  @Field()
  @MaxLength(10)
  name: string;

  @Field()
  @MaxLength(10)
  category: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 10)
  campus?: string;
}

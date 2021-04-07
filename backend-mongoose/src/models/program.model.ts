// Open API
import { ApiProperty } from '@nestjs/swagger';

// Validations
import { IsString, MinLength, Max, Min } from 'class-validator';

// Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// GraphQL
import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

/**
 * Model (Controller/Service)
 */

@Schema() // Main building block of any graphql schema
@ObjectType() // Object types are main building block of any graphql schema. In typegql - ObjectType is equivalent to GraphQLObjectType
export class Program {
  @Field() // Every ObjectType must have at least one field. To create new field, decorate any property or method of ObjectType class with @Field decorator:
  @Prop({ required: true }) // defines a property in the document
  name: string;

  @Field()
  @Prop({ required: true })
  category: string;

  @Field()
  @Prop({ required: true })
  campus: string;
}

/**
 * Mongoose
 */

export type ProgramDocument = Program & Document;
export const ProgramSchema = SchemaFactory.createForClass(Program);

/**
 * DTO (Controller/Service)
 */

export class CreateProgramDTO {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly category: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly campus: string;
}

export class UpdateProgramDTO {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly category: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  readonly campus: string;
}

/**
 * Body (Open API)
 */

export class CreateProgramBody {
  @ApiProperty()
  program: CreateProgramDTO;
}

export class UpdateProgramBody {
  @ApiProperty()
  program: UpdateProgramDTO;
}

/**
 * GraphQL
 * - Args
 * - InputType
 */

@ArgsType()
export class ProgramsArgs {
  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;
}

/**
 * Types
 */

export interface ProgramResponse {
  name: string;
  category: string;
  campus: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Inputs
 */

@InputType()
export class NewProgramInput {
  @Field()
  // @MaxLength(30)
  name: string;

  @Field()
  // @MaxLength(30)
  category: string;

  @Field({ nullable: true })
  // @IsOptional()
  // @Length(3, 30)
  campus?: string;
}

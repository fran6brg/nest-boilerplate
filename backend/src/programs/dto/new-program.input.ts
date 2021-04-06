import { Field, InputType } from '@nestjs/graphql';
// import { IsOptional, Length, MaxLength } from 'class-validator';

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

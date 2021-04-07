import { Field, InputType } from '@nestjs/graphql';
// import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
    @Field()
    // @MaxLength(30)
    userId: number;

    @Field()
    // @MaxLength(30)
    username: string;

    @Field()
    // @MaxLength(30)
    password: string;
}

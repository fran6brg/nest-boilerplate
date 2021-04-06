import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Program {
//   @Field(type => ID)
//   id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  campus?: string;
}

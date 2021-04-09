import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Program {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  campus?: string;
}

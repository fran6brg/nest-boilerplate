import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  age: number;

  @Field()
  username: string;

  @Field()
  password: string;
}

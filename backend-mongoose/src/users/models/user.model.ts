import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  userId: number;

  @Field()
  username: string;

  @Field()
  password: string;
}

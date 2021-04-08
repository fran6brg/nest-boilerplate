import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction } from 'mongoose';
import { IsString, Length, Max, Min } from 'class-validator';
@Schema()
export class User {
  @Prop({ required: true })
  @Min(2)
  @Max(3)
  userId!: number;

  @Prop({ required: true })
  @Length(2, 3)
  @IsString()
  username!: string;

  @IsString()
  @Prop({ required: true })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

UserSchema.pre('save', async function (next: HookNextFunction) {
  try {
    console.log("UserSchema | pre 'save'");
    return next();
  } catch (error) {
    console.log('UserSchema | error:', error);
    return next(error);
  }
});

UserSchema.post('save', async function () {
  try {
    console.log("UserSchema | post 'save'");
    return;
  } catch (error) {
    return error;
  }
});

UserSchema.pre('findOneAndUpdate', async function (next: HookNextFunction) {
  try {
    console.log(
      "UserSchema | pre 'findOneAndUpdate' | this.getUpdate():",
      this.getUpdate(),
    );
    return next();
  } catch (error) {
    return next();
  }
});

UserSchema.post('findOneAndUpdate', async function () {
  try {
    console.log(
      "UserSchema | post 'findOneAndUpdate' | this.getUpdate():",
      this.getUpdate(),
    );
    return;
  } catch (error) {
    return error;
  }
});

import { Document } from 'mongoose';

export interface User extends Document {
  userId: number;
  username: string;
  password: string;
}

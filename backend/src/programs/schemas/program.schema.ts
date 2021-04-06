import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgramDocument = Program & Document;

@Schema()
export class Program {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  campus: string;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);

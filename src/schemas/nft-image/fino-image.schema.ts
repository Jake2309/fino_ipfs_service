import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FinoImageDocument = HydratedDocument<FinoImage>;

@Schema()
export class FinoImage {
  @Prop({ required: true })
  name: string;
  size: number;
  type: string;
  extension: string;
}

export const FinoImageSchema = SchemaFactory.createForClass(FinoImage);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FinoImage } from '../nft-image/fino-image.schema';

export type NFTDocument = HydratedDocument<NFT>;

@Schema()
export class NFT {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  descriptions?: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FinoImage' }],
  })
  images: FinoImage[];

  @Prop()
  totalSupply: number;

  @Prop()
  basePrice: number;

  @Prop()
  marketPrice: number;
}

export const NFTSchema = SchemaFactory.createForClass(NFT);

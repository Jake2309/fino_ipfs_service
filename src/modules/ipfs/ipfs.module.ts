import { Module } from '@nestjs/common';
import { IpfsController } from '../../controllers/ipfs/ipfs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NFT, NFTSchema } from 'src/schemas/nft-info/nft.schema';
import { FinoImageRepository } from 'src/repositories/fino-image/fino-image.repo';

@Module({
  imports: [MongooseModule.forFeature([{ name: NFT.name, schema: NFTSchema }])],
  providers: [
    { provide: 'FinoImageRepository', useClass: FinoImageRepository },
  ],
  controllers: [IpfsController],
})
export class IpfsModule {}

import { Module } from '@nestjs/common';
import * as ipfsController from '../../controllers/ipfs/ipfs.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import * as nftSchema from '../../schemas/nft-info/nft.schema.js';
import * as finoImageRepo from '../../repositories/fino-image/fino-image.repo.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: nftSchema.NFT.name, schema: nftSchema.NFTSchema },
    ]),
  ],
  providers: [
    {
      provide: 'FinoImageRepository',
      useClass: finoImageRepo.FinoImageRepository,
    },
  ],
  controllers: [ipfsController.IpfsController],
})
export class IpfsModule {}

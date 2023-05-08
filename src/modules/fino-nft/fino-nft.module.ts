import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NFT, NFTSchema } from '../../schemas/nft-info/nft.schema.js';
import { FinoNFTController } from '../../controllers/fino-nft/fino-nft.controller.js';
import { FinoNFTRepository } from '../../repositories/fino-nft/fino-nft.repo.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NFT.name,
        schema: NFTSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'FinoNFTRepository',
      useClass: FinoNFTRepository,
    },
  ],
  controllers: [FinoNFTController],
})
export class FinoNFTModule {}

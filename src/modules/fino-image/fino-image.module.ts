import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as finoImageSchema from '../../schemas/nft-image/fino-image.schema.js';
import * as finoImageController from '../../controllers/fino-image/fino-image.controller.js';
import * as finoImageRepo from '../../repositories/fino-image/fino-image.repo.js';
// import { FinoImageRepositoryInterface } from 'src/repositories/fino-image/fino-image.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: finoImageSchema.FinoImage.name,
        schema: finoImageSchema.FinoImageSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'FinoImageRepository',
      useClass: finoImageRepo.FinoImageRepository,
    },
  ],
  controllers: [finoImageController.FinoImageController],
})
export class FinoImageModule {}

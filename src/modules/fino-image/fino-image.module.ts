import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FinoImage,
  FinoImageSchema,
} from 'src/schemas/nft-image/fino-image.schema';
import { FinoImageController } from 'src/controllers/fino-image/fino-image.controller';
import { FinoImageRepository } from 'src/repositories/fino-image/fino-image.repo';
// import { FinoImageRepositoryInterface } from 'src/repositories/fino-image/fino-image.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FinoImage.name, schema: FinoImageSchema },
    ]),
  ],
  providers: [
    { provide: 'FinoImageRepository', useClass: FinoImageRepository },
  ],
  controllers: [FinoImageController],
})
export class FinoImageModule {}

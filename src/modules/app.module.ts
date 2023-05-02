import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../repositories/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FinoImageModule } from './fino-image/fino-image.module';
import { FinoImageController } from 'src/controllers/fino-image/fino-image.controller';

@Module({
  imports: [
    FinoImageModule,
    MongooseModule.forRoot('mongodb://finoMongo:ZAQ!2wsx@localhost:27109'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

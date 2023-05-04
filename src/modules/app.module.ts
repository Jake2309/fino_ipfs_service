import { Module } from '@nestjs/common';
import * as appController from '../controllers/app.controller.js';
import * as appService from '../repositories/app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import * as finoImageModule from './fino-image/fino-image.module.js';

@Module({
  imports: [
    finoImageModule.FinoImageModule,
    MongooseModule.forRoot('mongodb://finoMongo:ZAQ!2wsx@127.0.0.1:27109'),
  ],
  controllers: [appController.AppController],
  providers: [appService.AppService],
})
export class AppModule {}

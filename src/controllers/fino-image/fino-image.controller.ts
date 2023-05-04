import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import * as imageUploadModel from '../../model/fino-image/image-upload.model.js';
import * as finoImageInterface from '../../repositories/fino-image/fino-image.interface.js';
import { Request, request } from 'express';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';

@Controller('api/fino-image')
export class FinoImageController {
  constructor(
    @Inject('FinoImageRepository')
    private readonly finoImageRepository: finoImageInterface.FinoImageRepositoryInterface,
  ) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('upload controller ');
    console.log(files);
    return this.finoImageRepository.upload(files);
  }

  @Get('test-function')
  async test(req, res) {
    console.log(req);
    return 'this is test response';
  }
}

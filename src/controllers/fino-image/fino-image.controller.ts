import { Controller, Get, Inject, Post } from '@nestjs/common';
import * as imageUploadModel from '../../model/fino-image/image-upload.model.js';
import * as finoImageInterface from '../../repositories/fino-image/fino-image.interface.js';

@Controller('api/fino-image')
export class FinoImageController {
  constructor(
    @Inject('FinoImageRepository')
    private readonly finoImageRepository: finoImageInterface.FinoImageRepositoryInterface,
  ) {}

  @Post()
  async upload(files: imageUploadModel.UploadFinoImgRequest[]) {
    return this.finoImageRepository.upload(files);
  }

  @Get('test-function')
  async test() {
    return 'this is test response';
  }
}

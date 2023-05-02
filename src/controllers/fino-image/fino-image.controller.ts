import { Controller, Get, Inject, Post } from '@nestjs/common';
import { UploadFinoImgRequest } from 'src/model/fino-image/image-upload.model';
import { FinoImageRepositoryInterface } from 'src/repositories/fino-image/fino-image.interface';

@Controller('api/fino-image')
export class FinoImageController {
  constructor(
    @Inject('FinoImageRepository')
    private readonly finoImageRepository: FinoImageRepositoryInterface,
  ) {}

  @Post()
  async upload(files: UploadFinoImgRequest[]) {
    return this.finoImageRepository.upload(files);
  }

  @Get('test-function')
  async test() {
    return 'this is test response';
  }
}

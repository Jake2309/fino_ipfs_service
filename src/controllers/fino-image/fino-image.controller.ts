import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FinoImageRepositoryInterface } from '../../repositories/fino-image/fino-image.interface.js';

@Controller('api/fino-image')
export class FinoImageController {
  constructor(
    @Inject('FinoImageRepository')
    private readonly finoImageRepository: FinoImageRepositoryInterface,
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({ maxSize: 5242880 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    console.log('upload controller ');
    console.log(files);
    return this.finoImageRepository.upload(files);
  }

  @Get('test-function')
  async test() {
    return 'this is test response';
  }
}

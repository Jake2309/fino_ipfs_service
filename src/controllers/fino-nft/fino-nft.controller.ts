import {
  Body,
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
import { CreateNFTRequest } from 'src/model/fino-nft/create-nft.model.js';
import { FinoNFTRepositoryInterface } from 'src/repositories/fino-nft/fino-nft.interface.js';

@Controller('api/fino-nft')
export class FinoNFTController {
  constructor(
    @Inject('FinoNFTRepository')
    private readonly finoNFTRepository: FinoNFTRepositoryInterface,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files[]', 20))
  async upload(
    @Body() body,
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
  ): Promise<void> {
    console.log('create NFT controller ');
    const request: CreateNFTRequest = {
      symbol: body.symbol,
      name: body.name,
      totalSupply: body.totalSupply,
      basePrice: body.basePrice,
      descriptions: body.descriptions,
      files: files,
    };
    return this.finoNFTRepository.createNFT(request);
  }

  @Get('test-function')
  async test() {
    return 'this is test response';
  }
}

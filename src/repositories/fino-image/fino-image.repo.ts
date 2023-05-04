import * as imageResponseModel from '../../model/fino-image/image-response.model.js';
import * as imageUploadModel from '../../model/fino-image/image-upload.model.js';
import * as finoImageInterface from '../fino-image/fino-image.interface.js';
import { injectable } from 'tsyringe';
import * as finoImageSchema from '../../schemas/nft-image/fino-image.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as IPFS from 'ipfs-core';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@injectable()
export class FinoImageRepository
  implements finoImageInterface.FinoImageRepositoryInterface
{
  constructor(
    @InjectModel(finoImageSchema.FinoImage.name)
    private finoImgModel: Model<finoImageSchema.FinoImage>,
  ) {}

  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<
    imageResponseModel.ImageResponse | imageResponseModel.ImageResponse[]
  > {
    if (Array.isArray(files)) {
      const paths = await Promise.all(
        files.map(async (file) => this.uploadFile(file)),
      );
      return paths.map((path) => ({ ipfsName: path }));
    }

    const path = await this.uploadFile(files);
    return { ipfsName: path };
  }

  private async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<string> {
    const ipfs = await this.loadIpfs();
    console.log(file);
    const result = await ipfs.add(file.buffer);
    console.log(result);

    return result.path;
  }

  private async loadIpfs() {
    // const { create } = await import('ipfs-core');

    const node = await IPFS.create();

    return node;
  }
}

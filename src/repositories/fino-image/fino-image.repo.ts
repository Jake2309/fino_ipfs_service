import { injectable } from 'tsyringe';
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
import { ImageResponse } from '../../model/fino-image/image-response.model.js';
import { FinoImageRepositoryInterface } from '../fino-image/fino-image.interface.js';
import { FinoImage } from '../../schemas/nft-image/fino-image.schema.js';

@injectable()
export class FinoImageRepository implements FinoImageRepositoryInterface {
  constructor(
    @InjectModel(FinoImage.name)
    private finoImgModel: Model<FinoImage>,
  ) {}

  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ImageResponse | ImageResponse[]> {
    if (Array.isArray(files)) {
      const ipfsList = await Promise.all(
        files.map(async (file) => this.uploadFile(file)),
      );
      return ipfsList;
    }

    const ipfs = await this.uploadFile(files);
    return ipfs;
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
  ): Promise<ImageResponse> {
    const node = await IPFS.create();
    // console.log(file);
    const result = await node.add(file.buffer);
    console.log(result);
    const ipfsModel: ImageResponse = {
      path: result.path,
      cid: result.cid,
      size: result.size,
      mode: result.mode,
      mtime: result.mtime,
    };

    return ipfsModel;
  }
}

import * as imageResponseModel from '../../model/fino-image/image-response.model.js';
import * as imageUploadModel from '../../model/fino-image/image-upload.model.js';
import * as finoImageInterface from '../fino-image/fino-image.interface.js';
import { injectable } from 'tsyringe';
import * as finoImageSchema from '../../schemas/nft-image/fino-image.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as IPFS from 'ipfs-core';

@injectable()
export class FinoImageRepository
  implements finoImageInterface.FinoImageRepositoryInterface
{
  constructor(
    @InjectModel(finoImageSchema.FinoImage.name)
    private finoImgModel: Model<finoImageSchema.FinoImage>,
  ) {}

  async upload(
    files: imageUploadModel.UploadFinoImgRequest[],
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
    file: imageUploadModel.UploadFinoImgRequest,
  ): Promise<string> {
    const ipfs = await this.loadIpfs();
    const result = await ipfs.add(file);
    console.log(result);

    return result.path;
  }

  private async loadIpfs() {
    // const { create } = await import('ipfs-core');

    const node = await IPFS.create();

    return node;
  }
}

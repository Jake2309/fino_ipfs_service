import { CreateNFTRequest } from '../../model/fino-nft/create-nft.model.js';
import { FinoNFTRepositoryInterface } from './fino-nft.interface.js';
import { injectable } from 'tsyringe';
import { Model } from 'mongoose';
import { NFT } from '../../schemas/nft-info/nft.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import * as IPFS from 'ipfs-core';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';
import { ImageResponse } from '../../model/fino-image/image-response.model.js';

@injectable()
export class FinoNFTRepository implements FinoNFTRepositoryInterface {
  constructor(
    @InjectModel(NFT.name)
    private finoImgModel: Model<NFT>,
  ) {}

  async createNFT(request: CreateNFTRequest) {
    const node = await IPFS.create();
    let imgUploadedList: ImageResponse[] = [];
    if (Array.isArray(request.files)) {
      imgUploadedList = await Promise.all(
        request.files.map(async (file) => this.uploadFile(file)),
      );
    }

    if (imgUploadedList.length > 0) {
      const paths = imgUploadedList.map(async (file) => file.path);

      const uploadObj = {
        symbol: request.symbol,
        name: request.name,
        totalSupply: request.totalSupply,
        basePrice: request.basePrice,
        descriptions: request.descriptions,
        files: paths,
      };

      const result = await node.add(uploadObj);
      console.log(result);
    }
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

import { ImageResponse } from 'src/model/fino-image/image-response.model';
import { UploadFinoImgRequest } from 'src/model/fino-image/image-upload.model';
import { FinoImageRepositoryInterface } from './fino-image.interface';
import { injectable } from 'tsyringe';
import { FinoImage } from 'src/schemas/nft-image/fino-image.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@injectable()
export class FinoImageRepository implements FinoImageRepositoryInterface {
  constructor(
    @InjectModel(FinoImage.name) private finoImgModel: Model<FinoImage>,
  ) {}

  async upload(
    files: UploadFinoImgRequest[],
  ): Promise<ImageResponse | ImageResponse[]> {
    if (Array.isArray(files)) {
      const paths = await Promise.all(
        files.map(async (file) => this.uploadFile(file)),
      );
      return paths.map((path) => ({ ipfsName: path }));
    }

    const path = await this.uploadFile(files);
    return { ipfsName: path };
  }

  private async uploadFile(file: UploadFinoImgRequest): Promise<string> {
    const ipfs = await this.loadIpfs();
    const result = await ipfs.add(file.content);
    console.log(result);

    return result.path;
  }

  private async loadIpfs() {
    const { create } = await import('ipfs-core');

    const node = await create({
      // ... config here
    });

    return node;
  }
}

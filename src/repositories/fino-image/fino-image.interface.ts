import { UploadedFiles } from '@nestjs/common';
import * as imageResponseModel from '../../model/fino-image/image-response.model.js';
import * as imageUploadModel from '../../model/fino-image/image-upload.model.js';

export abstract class FinoImageRepositoryInterface {
  abstract upload(
    files: Array<Express.Multer.File>,
  ): Promise<
    | imageResponseModel.ImageResponse
    | imageResponseModel.ImageResponse[]
    | undefined
  >;
}

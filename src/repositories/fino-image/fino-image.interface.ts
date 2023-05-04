import * as imageResponseModel from '../../model/fino-image/image-response.model.js';
import * as imageUploadModel from '../../model/fino-image/image-upload.model.js';

export abstract class FinoImageRepositoryInterface {
  abstract upload(
    files: imageUploadModel.UploadFinoImgRequest[],
  ): Promise<
    | imageResponseModel.ImageResponse
    | imageResponseModel.ImageResponse[]
    | undefined
  >;
}

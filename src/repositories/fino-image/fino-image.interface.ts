import { ImageResponse } from 'src/model/fino-image/image-response.model';
import { UploadFinoImgRequest } from 'src/model/fino-image/image-upload.model';

export abstract class FinoImageRepositoryInterface {
  abstract upload(
    files: UploadFinoImgRequest[],
  ): Promise<ImageResponse | ImageResponse[] | undefined>;
}

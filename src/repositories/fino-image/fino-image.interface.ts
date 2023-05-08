import { ImageResponse } from '../../model/fino-image/image-response.model.js';

export abstract class FinoImageRepositoryInterface {
  abstract upload(
    files: Array<Express.Multer.File>,
  ): Promise<ImageResponse | ImageResponse[] | undefined>;
}

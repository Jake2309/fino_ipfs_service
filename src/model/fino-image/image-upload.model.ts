export interface UploadFinoImgRequest {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
}

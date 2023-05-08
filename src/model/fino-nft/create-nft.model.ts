export interface CreateNFTRequest {
  symbol: string;
  name: string;
  totalSupply: number;
  basePrice: number;
  descriptions: string;
  files: Array<Express.Multer.File>;
}

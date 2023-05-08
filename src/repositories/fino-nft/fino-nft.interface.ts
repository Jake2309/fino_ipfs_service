import { CreateNFTRequest } from '../../model/fino-nft/create-nft.model.js';

export abstract class FinoNFTRepositoryInterface {
  /*
  Function to create NFT information
  with file is image of contract or owner certificates
   */
  abstract createNFT(request: CreateNFTRequest): void;
}

import { ethers } from 'ethers';

// Contract address on Sepolia testnet
export const CONTRACT_ADDRESS = '0x69DEA575c1A3F649C056af1aa66D22a18C3683e4';

// Complete contract ABI
export const CONTRACT_ABI = [
  // Read Functions
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function contractURI() view returns (string)",
  "function exists(uint256 tokenId) view returns (bool)",
  "function isTransferable(uint256 tokenId) view returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenName(uint256 tokenId) view returns (string)",
  "function totalSupply(uint256 tokenId) view returns (uint256)",
  "function uri(uint256 tokenId) view returns (string)",
  
  // Write Functions
  "function mintCertificate(address to, uint256 amount, string tokenName_, bytes data) nonpayable returns (uint256)",
  "function toggleTransferability(uint256 tokenId, bool transferable) nonpayable"
];

// Create a contract instance
export const getContract = (provider: ethers.providers.Web3Provider) => {
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

// Check if a user owns a specific token
export const hasToken = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number,
  address: string
): Promise<boolean> => {
  try {
    const contract = getContract(provider);
    const balance = await contract.balanceOf(address, tokenId);
    return balance.gt(0);
  } catch (error) {
    console.error('Error checking token balance:', error);
    return false;
  }
};

// Check if a token exists
export const isTokenMintable = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number
): Promise<boolean> => {
  try {
    const contract = getContract(provider);
    return await contract.exists(tokenId);
  } catch (error) {
    console.error('Error checking if token exists:', error);
    return false;
  }
};

// Mint a token to a user
export const mintToken = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number,
  address: string,
  amount: number = 1
): Promise<ethers.ContractTransaction> => {
  try {
    const contract = getContract(provider);
    const certificateName = `Certificate #${tokenId}`;
    const data = "0x"; // Empty data
    
    // Mint the token using mintCertificate
    return await contract.mintCertificate(
      address,
      amount,
      certificateName,
      data
    );
  } catch (error) {
    console.error('Error minting token:', error);
    throw error;
  }
};

// Batch mint tokens to a user - Not supported in SoulboundCertificateV2
export const mintBatchTokens = async (
  provider: ethers.providers.Web3Provider,
  tokenIds: number[],
  address: string,
  amounts: number[] = []
): Promise<ethers.ContractTransaction> => {
  throw new Error('Batch minting is not supported in the new contract');
};

// Get token metadata URI
export const getTokenURI = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number
): Promise<string> => {
  try {
    const contract = getContract(provider);
    return await contract.uri(tokenId);
  } catch (error) {
    console.error('Error getting token URI:', error);
    throw error;
  }
};

// Get contract URI
export const getContractURI = async (
  provider: ethers.providers.Web3Provider
): Promise<string> => {
  try {
    const contract = getContract(provider);
    return await contract.contractURI();
  } catch (error) {
    console.error('Error getting contract URI:', error);
    throw error;
  }
};

// Fetch token metadata from URI
export const fetchTokenMetadata = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number
): Promise<any> => {
  try {
    // Get the token URI
    const uri = await getTokenURI(provider, tokenId);
    
    // Replace any {id} placeholder with the tokenId in hex format
    const formattedUri = uri.replace(
      '{id}',
      ethers.utils.hexZeroPad(ethers.utils.hexlify(tokenId), 32).slice(2)
    );
    
    // Fetch the metadata
    const response = await fetch(formattedUri);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return {
      name: `Token #${tokenId}`,
      description: 'Metadata could not be loaded',
      image: ''
    };
  }
};

// Estimate gas for minting
export const estimateMintGas = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number,
  address: string
): Promise<{gasLimit: ethers.BigNumber, gasPrice: ethers.BigNumber, estimatedCost: string}> => {
  try {
    const contract = getContract(provider);
    const certificateName = `Certificate #${tokenId}`;
    const data = "0x"; // Empty data
    
    // Estimate gas for mintCertificate
    const gasLimit = await contract.estimateGas.mintCertificate(
      address,
      1, // amount
      certificateName,
      data
    );
    const gasPrice = await provider.getGasPrice();
    
    // Calculate estimated cost
    const estimatedCost = ethers.utils.formatEther(gasLimit.mul(gasPrice));
    
    return {
      gasLimit,
      gasPrice,
      estimatedCost
    };
  } catch (error) {
    console.error('Error estimating gas:', error);
    throw error;
  }
};

// Get token name
export const getTokenName = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number
): Promise<string> => {
  try {
    const contract = getContract(provider);
    return await contract.tokenName(tokenId);
  } catch (error) {
    console.error('Error getting token name:', error);
    return `Token #${tokenId}`;
  }
};

// Check if token is transferable
export const isTransferable = async (
  provider: ethers.providers.Web3Provider,
  tokenId: number
): Promise<boolean> => {
  try {
    const contract = getContract(provider);
    return await contract.isTransferable(tokenId);
  } catch (error) {
    console.error('Error checking transferability:', error);
    return false;
  }
};

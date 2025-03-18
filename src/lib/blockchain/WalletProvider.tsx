import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

// Sepolia chain ID
const SEPOLIA_CHAIN_ID = 11155111;

// Configure web3modal
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      // Use Infura as a fallback RPC provider
      infuraId: 'your-infura-id', // Replace with your Infura ID if needed
      rpc: {
        [SEPOLIA_CHAIN_ID]: 'https://eth-sepolia.g.alchemy.com/v2/vTDFF7It0sBWpkFeRtC9wruuHH7E0Mc-'
      }
    }
  }
};

// Initialize web3modal
let web3Modal: Web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'sepolia',
    cacheProvider: true,
    providerOptions
  });
}

// Define the wallet context type
interface WalletContextType {
  provider: ethers.providers.Web3Provider | null;
  address: string;
  chainId: number | null;
  isConnecting: boolean;
  isCorrectNetwork: boolean;
  error: string | null;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  switchToSepolia: () => Promise<boolean>;
}

// Create the wallet context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Create the wallet provider component
export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [address, setAddress] = useState<string>('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if the wallet is connected to the correct network
  const isCorrectNetwork = chainId === SEPOLIA_CHAIN_ID;

  // Connect wallet
  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Get the provider from web3modal
      const web3Provider = await web3Modal.connect();
      
      // Create ethers provider
      const ethersProvider = new ethers.providers.Web3Provider(web3Provider);
      setProvider(ethersProvider);
      
      // Get the connected chain ID
      const network = await ethersProvider.getNetwork();
      setChainId(network.chainId);
      
      // Get the user's address
      const signer = ethersProvider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      
      // Setup event listeners
      web3Provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect();
        } else {
          // User switched accounts
          setAddress(accounts[0]);
        }
      });
      
      web3Provider.on('chainChanged', (newChainId: string) => {
        // Chain ID is in hex, convert to number
        setChainId(parseInt(newChainId, 16));
      });
      
      web3Provider.on('disconnect', () => {
        disconnect();
      });
      
      return true;
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet');
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    setProvider(null);
    setAddress('');
    setChainId(null);
  }, []);

  // Switch to Sepolia network
  const switchToSepolia = useCallback(async () => {
    if (!provider) return false;
    
    try {
      // Request network switch
      await provider.send('wallet_switchEthereumChain', [
        { chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }
      ]);
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await provider.send('wallet_addEthereumChain', [
            {
              chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/vTDFF7It0sBWpkFeRtC9wruuHH7E0Mc-'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }
          ]);
          return true;
        } catch (addError) {
          console.error('Error adding Sepolia network:', addError);
          setError('Failed to add Sepolia network');
          return false;
        }
      }
      console.error('Error switching to Sepolia network:', switchError);
      setError('Failed to switch to Sepolia network');
      return false;
    }
  }, [provider]);

  // Auto-connect if the provider is cached
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // Create the context value
  const contextValue: WalletContextType = {
    provider,
    address,
    chainId,
    isConnecting,
    isCorrectNetwork,
    error,
    connect,
    disconnect,
    switchToSepolia
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Create a hook to use the wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

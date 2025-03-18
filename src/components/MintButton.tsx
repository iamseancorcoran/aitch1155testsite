
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Check, Loader2, AlertCircle, Info } from "lucide-react";
import { ethers } from "ethers";
import { useWallet } from "@/lib/blockchain/wallet";
import { mintToken, hasToken, estimateMintGas, getTokenName, getContract } from "@/lib/blockchain/contract";
import TokenMetadata from "./TokenMetadata";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MintButtonProps {
  tokenId?: number;
}

const MintButton = ({ tokenId = 1 }: MintButtonProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [isCheckingOwnership, setIsCheckingOwnership] = useState(false);
  const [isEstimatingGas, setIsEstimatingGas] = useState(false);
  const [gasEstimate, setGasEstimate] = useState<{
    gasLimit: any;
    gasPrice: any;
    estimatedCost: string;
  } | null>(null);
  const [tokenNameText, setTokenNameText] = useState<string>("");
  const [showMetadata, setShowMetadata] = useState(false);
  const { toast } = useToast();
  
  const {
    provider,
    address,
    isCorrectNetwork
  } = useWallet();
  
  // Check if wallet is connected
  const isWalletConnected = !!address;
  
  // Check if user already owns this token and get token name
  useEffect(() => {
    const checkTokenDetails = async () => {
      if (provider && address) {
        setIsCheckingOwnership(true);
        try {
          // Check token ownership
          const ownsToken = await hasToken(provider, tokenId, address);
          setIsMinted(ownsToken);
          
          // Get token name
          const name = await getTokenName(provider, tokenId);
          setTokenNameText(name);
          
          // If token is owned, show metadata
          if (ownsToken) {
            setShowMetadata(true);
          }
        } catch (error) {
          console.error("Error checking token details:", error);
        } finally {
          setIsCheckingOwnership(false);
        }
      }
    };
    
    checkTokenDetails();
  }, [provider, address, tokenId]);
  
  // Estimate gas when wallet is connected and on correct network
  useEffect(() => {
    const getGasEstimate = async () => {
      if (provider && address && isCorrectNetwork && !isMinted) {
        setIsEstimatingGas(true);
        try {
          const estimate = await estimateMintGas(provider, tokenId, address);
          setGasEstimate(estimate);
        } catch (error) {
          console.error("Error estimating gas:", error);
        } finally {
          setIsEstimatingGas(false);
        }
      }
    };
    
    getGasEstimate();
  }, [provider, address, isCorrectNetwork, isMinted, tokenId]);

  const handleMint = async () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before minting.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isCorrectNetwork) {
      toast({
        title: "Wrong Network",
        description: "Please switch to Sepolia testnet before minting.",
        variant: "destructive",
      });
      return;
    }
    
    // Add wallet-connecting class to body to fix z-index issues with MetaMask popup
    document.body.classList.add('wallet-connecting');
    
    setIsMinting(true);
    
    try {
      // Mint the token using our contract service
      const tx = await mintToken(provider!, tokenId, address);
      
      // Wait for transaction to be mined
      toast({
        title: "Transaction Submitted",
        description: `Your transaction has been submitted with hash: ${tx.hash.substring(0, 6)}...${tx.hash.substring(tx.hash.length - 4)}`,
      });
      
      const receipt = await tx.wait();
      
      // Try to extract the token ID from the event
      let newTokenId = tokenId;
      try {
        // Find the CertificateMinted event to get the token ID
        const contract = getContract(provider!);
        const eventSignature = "CertificateMinted(address,uint256,string)";
        const eventId = ethers.utils.id(eventSignature);
        
        const event = receipt.logs.find(
          log => log.topics[0] === eventId
        );
        
        if (event) {
          const iface = new ethers.utils.Interface([`event ${eventSignature}`]);
          const decodedLog = iface.parseLog(event);
          newTokenId = decodedLog.args[1].toNumber();
          console.log("Minted token ID:", newTokenId);
        }
      } catch (error) {
        console.error("Error decoding event:", error);
      }
      
      // Update state
      setIsMinted(true);
      setShowMetadata(true);
      
      toast({
        title: "Certificate Successfully Minted",
        description: `Transaction confirmed in block #${receipt.blockNumber}. Your legal education certificate has been minted.`,
      });
    } catch (error: any) {
      console.error("Error minting token:", error);
      
      // Handle specific errors
      if (error.code === 4001) {
        // User rejected transaction
        toast({
          title: "Transaction Cancelled",
          description: "You cancelled the transaction.",
          variant: "destructive",
        });
      } else if (error.message && error.message.includes("execution reverted")) {
        // Contract error
        toast({
          title: "Contract Error",
          description: "The contract rejected the transaction. You may not have permission to mint.",
          variant: "destructive",
        });
      } else if (error.message && error.message.includes("insufficient funds")) {
        // Insufficient funds
        toast({
          title: "Insufficient Funds",
          description: "You don't have enough ETH to cover the transaction cost.",
          variant: "destructive",
        });
      } else {
        // Generic error
        toast({
          title: "Minting Failed",
          description: "There was an error minting your certificate. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsMinting(false);
      
      // Remove the wallet-connecting class
      setTimeout(() => {
        document.body.classList.remove('wallet-connecting');
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleMint}
        disabled={isMinting || isMinted || !isWalletConnected || isCheckingOwnership || !isCorrectNetwork}
        className={`w-full text-lg px-8 py-6 rounded-xl transition-all duration-500
          ${isMinted 
            ? "bg-green-600 hover:bg-green-700" 
            : !isWalletConnected || !isCorrectNetwork
            ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
            : "education-accent"
          } 
          relative certificate-glow`}
      >
        <span className="flex items-center">
          {isCheckingOwnership ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Checking Ownership...
            </>
          ) : isMinted ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Certificate Verified
            </>
          ) : isMinting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Minting Certificate...
            </>
          ) : !isWalletConnected ? (
            <>
              <AlertCircle className="w-5 h-5 mr-2" />
              Connect Wallet to Mint
            </>
          ) : !isCorrectNetwork ? (
            <>
              <AlertCircle className="w-5 h-5 mr-2" />
              Switch to Sepolia Network
            </>
          ) : (
            <>
              <Shield className="w-5 h-5 mr-2" />
              Mint Certificate
            </>
          )}
        </span>
      </Button>
      
      {/* Gas estimate tooltip */}
      {gasEstimate && !isMinted && isWalletConnected && isCorrectNetwork && !isMinting && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-xs text-muted-foreground cursor-help">
                <Info className="h-3 w-3 mr-1" />
                Estimated cost: {gasEstimate.estimatedCost} ETH
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gas Limit: {gasEstimate.gasLimit.toString()}</p>
              <p>Gas Price: {parseFloat(ethers.utils.formatUnits(gasEstimate.gasPrice, 'gwei')).toFixed(2)} Gwei</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {isMinted && (
        <div className="text-sm text-center text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg">
          Your certificate for <strong>{tokenNameText || `Token #${tokenId}`}</strong> is now permanently verified on the blockchain
        </div>
      )}
      
      {!isMinted && !isMinting && !isWalletConnected && (
        <p className="text-sm text-center text-amber-700 bg-amber-50 px-4 py-2 rounded-lg">
          Please connect your wallet using the button in the top right corner
        </p>
      )}
      
      {!isMinted && !isMinting && isWalletConnected && !isCorrectNetwork && (
        <p className="text-sm text-center text-amber-700 bg-amber-50 px-4 py-2 rounded-lg">
          Please switch to Sepolia testnet in your wallet
        </p>
      )}
      
      {!isMinted && !isMinting && isWalletConnected && isCorrectNetwork && (
        <p className="text-sm text-center text-muted-foreground">
          Blockchain verification creates a permanent record of your legal education
        </p>
      )}
      
      {/* Token metadata section */}
      {showMetadata && (
        <Accordion type="single" collapsible className="w-full mt-6">
          <AccordionItem value="metadata">
            <AccordionTrigger className="text-sm font-medium">
              View Certificate Details
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4">
                <TokenMetadata tokenId={tokenId} showDetails={true} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default MintButton;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Check, Loader2, AlertCircle } from "lucide-react";

const MintButton = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { toast } = useToast();

  // Check if wallet is connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      const { ethereum } = window as any;
      if (ethereum) {
        try {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          setIsWalletConnected(accounts.length > 0);
          
          // Listen for account changes
          ethereum.on('accountsChanged', (accounts: string[]) => {
            setIsWalletConnected(accounts.length > 0);
          });
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          setIsWalletConnected(false);
        }
      }
    };
    
    checkWalletConnection();
    
    return () => {
      // Clean up listeners
      const { ethereum } = window as any;
      if (ethereum) {
        ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const handleMint = async () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet before minting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsMinting(true);
    
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // In a real implementation, this would interact with a smart contract
      // const { ethereum } = window as any;
      // const provider = new ethers.providers.Web3Provider(ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // const mintTx = await contract.mint();
      // await mintTx.wait();
      
      // Mock successful mint
      setIsMinted(true);
      toast({
        title: "Certificate Successfully Verified",
        description: "Your legal education certificate has been minted and will appear in your wallet soon.",
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "There was an error minting your certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleMint}
        disabled={isMinting || isMinted || !isWalletConnected}
        className={`w-full text-lg px-8 py-6 rounded-xl transition-all duration-500
          ${isMinted 
            ? "bg-green-600 hover:bg-green-700" 
            : !isWalletConnected
            ? "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
            : "education-accent"
          } 
          relative certificate-glow`}
      >
        <span className="flex items-center">
          {isMinted ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Certificate Verified
            </>
          ) : isMinting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Verifying on Blockchain...
            </>
          ) : !isWalletConnected ? (
            <>
              <AlertCircle className="w-5 h-5 mr-2" />
              Connect Wallet to Verify
            </>
          ) : (
            <>
              <Shield className="w-5 h-5 mr-2" />
              Verify Certificate Now
            </>
          )}
        </span>
      </Button>
      
      {isMinted && (
        <div className="text-sm text-center text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg">
          Your certificate is now permanently verified on the blockchain
        </div>
      )}
      
      {!isMinted && !isMinting && !isWalletConnected && (
        <p className="text-sm text-center text-amber-700 bg-amber-50 px-4 py-2 rounded-lg">
          Please connect your wallet using the button in the top right corner
        </p>
      )}
      
      {!isMinted && !isMinting && isWalletConnected && (
        <p className="text-sm text-center text-muted-foreground">
          Blockchain verification creates a permanent record of your legal education
        </p>
      )}
    </div>
  );
};

export default MintButton;

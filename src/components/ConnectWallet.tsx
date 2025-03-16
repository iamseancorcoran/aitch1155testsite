
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const { toast } = useToast();

  // Check if the browser has Ethereum provider (MetaMask)
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window as any;
    
    if (!ethereum) {
      console.log("Make sure you have MetaMask installed!");
      return false;
    }
    
    console.log("We have the ethereum object", ethereum);
    return true;
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setConnectionError("");
    
    try {
      const hasWallet = await checkIfWalletIsConnected();
      
      if (!hasWallet) {
        toast({
          title: "Wallet Not Found",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive",
        });
        setConnectionError("No wallet detected");
        setIsConnecting(false);
        return;
      }
      
      const { ethereum } = window as any;
      
      // Request account access
      const accounts = await ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setConnected(true);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
        });
        
        // Listen for account changes
        ethereum.on("accountsChanged", (newAccounts: string[]) => {
          if (newAccounts.length === 0) {
            disconnectWallet();
          } else {
            setWalletAddress(newAccounts[0]);
          }
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setConnectionError("Failed to connect wallet");
      
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress("");
    
    // Remove event listeners
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.removeAllListeners("accountsChanged");
    }
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <div className="relative animate-fade-in">
      {!connected ? (
        <div>
          <Button 
            onClick={connectWallet}
            className="bg-primary/90 hover:bg-primary transition-all duration-300 rounded-full px-6"
            disabled={isConnecting}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
          
          {connectionError && (
            <div className="absolute top-12 right-0 mt-2 bg-red-50 text-red-700 px-3 py-2 rounded-md text-xs font-medium">
              <div className="flex items-center">
                <XCircle className="h-3 w-3 mr-1" />
                {connectionError}
              </div>
              <a 
                href="https://metamask.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary flex items-center mt-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Install MetaMask
              </a>
            </div>
          )}
        </div>
      ) : (
        <Button 
          onClick={disconnectWallet}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm border border-primary/20 hover:bg-white/20 transition-all duration-300 rounded-full px-6"
        >
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          {`${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;

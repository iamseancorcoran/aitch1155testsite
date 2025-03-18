
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/lib/blockchain/wallet";

const ConnectWallet = () => {
  const [networkError, setNetworkError] = useState("");
  const { toast } = useToast();
  
  const {
    address,
    isConnecting,
    isCorrectNetwork,
    error: connectionError,
    connect,
    disconnect,
    switchToSepolia
  } = useWallet();
  
  // Check if wallet is connected
  const connected = !!address;
  
  // Handle wallet connection
  const handleConnect = async () => {
    // Add wallet-connecting class to body to fix z-index issues with MetaMask popup
    document.body.classList.add('wallet-connecting');
    
    const success = await connect();
    
    // Remove the class after connection attempt is complete
    setTimeout(() => {
      document.body.classList.remove('wallet-connecting');
    }, 500);
    
    if (success) {
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect();
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };
  
  // Handle network switching
  const handleSwitchNetwork = async () => {
    setNetworkError("");
    
    // Add wallet-connecting class to body to fix z-index issues with MetaMask popup
    document.body.classList.add('wallet-connecting');
    
    const success = await switchToSepolia();
    
    // Remove the class after network switch attempt is complete
    setTimeout(() => {
      document.body.classList.remove('wallet-connecting');
    }, 500);
    
    if (success) {
      toast({
        title: "Network Switched",
        description: "Successfully connected to Sepolia testnet",
      });
    } else {
      setNetworkError("Wrong network");
      toast({
        title: "Network Switch Failed",
        description: "Please manually switch to Sepolia testnet in your wallet",
        variant: "destructive",
      });
    }
  };
  
  // Check network on connection
  useEffect(() => {
    if (connected && !isCorrectNetwork) {
      setNetworkError("Wrong network");
      toast({
        title: "Wrong Network",
        description: "Please switch to Sepolia testnet",
        variant: "destructive",
      });
    } else {
      setNetworkError("");
    }
  }, [connected, isCorrectNetwork, toast]);

  return (
    <div className="relative animate-fade-in">
      {!connected ? (
        <div>
          <Button 
            onClick={handleConnect}
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
        <div className="flex flex-col items-end">
          <Button 
            onClick={handleDisconnect}
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border border-primary/20 hover:bg-white/20 transition-all duration-300 rounded-full px-6"
          >
            {networkError ? (
              <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            )}
            {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
          </Button>
          
          {networkError && (
            <div className="mt-2 bg-amber-50 text-amber-700 px-3 py-2 rounded-md text-xs font-medium">
              <div className="flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {networkError}
              </div>
              <Button 
                variant="link" 
                className="text-primary p-0 h-auto text-xs font-medium flex items-center mt-1 hover:underline"
                onClick={handleSwitchNetwork}
              >
                Switch to Sepolia
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;

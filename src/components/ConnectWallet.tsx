
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    // This is a mock implementation
    // In a real implementation, you would connect to MetaMask or another wallet
    
    setIsConnecting(true);
    
    // Simulate delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Mock successful connection
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12).padEnd(40, '0');
      setWalletAddress(mockAddress);
      setConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${mockAddress.substring(0, 6)}...${mockAddress.substring(38)}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress("");
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <div className="relative animate-fade-in">
      {!connected ? (
        <Button 
          onClick={connectWallet}
          className="bg-primary/90 hover:bg-primary transition-all duration-300 rounded-full px-6"
          disabled={isConnecting}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <Button 
          onClick={disconnectWallet}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm border border-primary/20 hover:bg-white/20 transition-all duration-300 rounded-full px-6"
        >
          <Wallet className="mr-2 h-4 w-4 text-primary" />
          {`${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;

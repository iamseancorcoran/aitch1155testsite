
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Check, Loader2 } from "lucide-react";

const MintButton = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const { toast } = useToast();

  const handleMint = async () => {
    setIsMinting(true);
    
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
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
        disabled={isMinting || isMinted}
        className={`w-full text-lg px-8 py-6 rounded-xl transition-all duration-500
          ${isMinted 
            ? "bg-green-600 hover:bg-green-700" 
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
      
      {!isMinted && !isMinting && (
        <p className="text-sm text-center text-muted-foreground">
          Blockchain verification creates a permanent record of your legal education
        </p>
      )}
    </div>
  );
};

export default MintButton;

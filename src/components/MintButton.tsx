
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
        title: "NFT Minted Successfully",
        description: "Your exclusive NFT has been minted and will appear in your wallet soon.",
      });
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "There was an error minting your NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleMint}
        disabled={isMinting || isMinted}
        className={`text-lg px-12 py-8 rounded-2xl transition-all duration-500 min-w-72
          ${isMinted 
            ? "bg-green-500 hover:bg-green-600" 
            : "bg-mint hover:bg-mint-light shadow-md hover:shadow-xl"
          } 
          animate-scale-in`}
      >
        <span className="flex items-center">
          {isMinted ? (
            <>
              <svg 
                className="w-6 h-6 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              Minted
            </>
          ) : isMinting ? (
            <>
              <svg 
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Minting...
            </>
          ) : (
            "Mint NFT"
          )}
        </span>
      </Button>
      
      {!isMinted && !isMinting && (
        <div className="absolute -inset-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 -z-10 group-hover:opacity-40 transition-all duration-1000"></div>
      )}
    </div>
  );
};

export default MintButton;

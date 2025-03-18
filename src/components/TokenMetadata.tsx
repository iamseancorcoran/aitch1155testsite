import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Shield, Lock, Unlock } from "lucide-react";
import { useWallet } from "@/lib/blockchain/wallet";
import { fetchTokenMetadata, getTokenName, isTransferable } from "@/lib/blockchain/contract";

interface TokenMetadataProps {
  tokenId: number;
  showDetails?: boolean;
}

const TokenMetadata = ({ tokenId, showDetails = false }: TokenMetadataProps) => {
  const [metadata, setMetadata] = useState<any>(null);
  const [tokenName, setTokenName] = useState<string>("");
  const [transferable, setTransferable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { provider } = useWallet();
  
  useEffect(() => {
    const loadMetadata = async () => {
      if (!provider) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch token metadata
        const data = await fetchTokenMetadata(provider, tokenId);
        setMetadata(data);
        
        // Get token name from contract
        const name = await getTokenName(provider, tokenId);
        setTokenName(name);
        
        // Check if token is transferable
        const canTransfer = await isTransferable(provider);
        setTransferable(canTransfer);
      } catch (err) {
        console.error("Error loading token metadata:", err);
        setError("Failed to load token metadata");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMetadata();
  }, [provider, tokenId]);
  
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-3 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Metadata</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{tokenName || metadata?.name || `Token #${tokenId}`}</CardTitle>
          <Badge variant={transferable ? "default" : "secondary"}>
            {transferable ? (
              <Unlock className="h-3 w-3 mr-1" />
            ) : (
              <Lock className="h-3 w-3 mr-1" />
            )}
            {transferable ? "Transferable" : "Soulbound"}
          </Badge>
        </div>
        <CardDescription>
          Token ID: {tokenId}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {metadata?.image && (
          <div className="mb-4 rounded-lg overflow-hidden border">
            <img 
              src={metadata.image} 
              alt={metadata.name || `Token #${tokenId}`} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          {metadata?.description && (
            <p className="text-sm text-muted-foreground">{metadata.description}</p>
          )}
          
          {showDetails && metadata?.attributes && metadata.attributes.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Attributes</h4>
              <div className="grid grid-cols-2 gap-2">
                {metadata.attributes.map((attr: any, index: number) => (
                  <div key={index} className="bg-muted p-2 rounded-md">
                    <div className="text-xs text-muted-foreground">{attr.trait_type}</div>
                    <div className="font-medium">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {showDetails && (
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Shield className="h-3 w-3 mr-1" />
            Verified on Blockchain
          </div>
          
          {metadata?.external_url && (
            <a 
              href={metadata.external_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary flex items-center hover:underline"
            >
              View Details
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default TokenMetadata;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import ConnectWallet from "@/components/ConnectWallet";
import MintButton from "@/components/MintButton";

const Mint = () => {
  const { user, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not logged in
    if (!loading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-4 w-32 bg-primary/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 backdrop-blur-sm bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-tight">NFT Gateway</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground animate-fade-in">
              Welcome, {user?.name}
            </span>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="w-full max-w-4xl mx-auto relative z-10 animate-slide-up">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-xs font-medium text-primary/90 mb-2 animate-fade-in">
              Exclusive NFT Collection
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Mint Your Exclusive NFT
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your wallet and click the button below to mint your unique digital collectible.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center space-y-8 border-none">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center animate-pulse-subtle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-32 h-32 text-primary/30"
              >
                <path d="M12 2v8"></path>
                <path d="m16 6-4-4-4 4"></path>
                <path d="M8 10V8H4v12h16V8h-4v2"></path>
                <path d="M12 18v-6"></path>
                <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
              </svg>
            </div>
            
            <MintButton />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 backdrop-blur-sm bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2023 NFT Gateway. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Mint;

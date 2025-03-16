import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import ConnectWallet from "@/components/ConnectWallet";
import MintButton from "@/components/MintButton";
import { BookOpen, Award, Shield, ChevronRight } from "lucide-react";
const Mint = () => {
  const {
    user,
    isLoggedIn,
    loading
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to login if not logged in
    if (!loading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate]);
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-4 w-32 bg-primary/20 rounded"></div>
        </div>
      </div>;
  }
  if (!isLoggedIn) {
    return null; // Will redirect via useEffect
  }
  return <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 backdrop-blur-sm bg-white/30 border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl tracking-tight text-primary font-medium">Smart Contract Tester</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-muted-foreground animate-fade-in">
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
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="w-full max-w-4xl mx-auto relative z-10 animate-slide-up">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-xs font-medium text-primary mb-2 animate-fade-in">
              Blockchain Verified Legal Certification
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary">
              Mint Your Legal Education Certificate
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Permanently verify your legal education credentials on the blockchain with a tamper-proof certificate.
            </p>
          </div>

          <div className="premium-glass rounded-2xl p-8 md:p-12 mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 certificate-border">
                <div className="legal-paper rounded-lg flex items-center justify-center p-8 relative certificate-glow">
                  <div className="absolute top-3 right-3">
                    <div className="verified-badge">
                      <Shield className="w-3 h-3 mr-1" />
                      <span>Blockchain Verified</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="text-center py-8 space-y-4">
                    <h3 className="text-sm text-gray-500 uppercase tracking-widest">Certificate of Completion</h3>
                    <h2 className="text-2xl font-bold">Legal Education Program</h2>
                    <p className="text-gray-600">This certifies that</p>
                    <p className="text-xl font-semibold">{user?.name}</p>
                    <p className="text-gray-600">has successfully completed the required coursework</p>
                    <div className="pt-4">
                      <p className="text-sm text-gray-500">Blockchain verification pending</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Blockchain Verification Benefits</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-accent/10 p-1.5 rounded-full text-accent">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">Tamper-Proof</h4>
                        <p className="text-sm text-muted-foreground">Your credentials cannot be altered or falsified</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-accent/10 p-1.5 rounded-full text-accent">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">Permanently Stored</h4>
                        <p className="text-sm text-muted-foreground">Your certificate will exist indefinitely on the blockchain</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-accent/10 p-1.5 rounded-full text-accent">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">Easily Verifiable</h4>
                        <p className="text-sm text-muted-foreground">Anyone can verify your credentials with your unique token</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <MintButton />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl">
              <div className="bg-primary/10 p-2 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-sm text-muted-foreground">Backed by blockchain technology for maximum security and authenticity verification.</p>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <div className="bg-primary/10 p-2 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3.05078 11C3.27368 7.94288 4.94522 5.29431 7.34731 3.90777C9.74939 2.52123 12.6386 2.46609 15.0884 3.75721C17.5382 5.04832 19.2896 7.62275 19.6039 10.5606C19.9183 13.4985 18.755 16.3918 16.4982 18.2792C14.2415 20.1666 11.2047 20.7803 8.31063 19.9307C5.41659 19.081 3.10916 16.8556 2.05078 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Permanent</h3>
              <p className="text-sm text-muted-foreground">Your educational achievements will be permanently recorded and accessible.</p>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <div className="bg-primary/10 p-2 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional</h3>
              <p className="text-sm text-muted-foreground">Enhance your professional credentials with blockchain-verified certification.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 backdrop-blur-sm bg-white/10 border-t border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2023 LegalEdu Verify. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>;
};
export default Mint;
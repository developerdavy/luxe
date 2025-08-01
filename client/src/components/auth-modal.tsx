import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp, isLoading } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string>("");

  const handleSignIn = async (formData: FormData) => {
    setError("");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn(email, password);
    
    if (result.success) {
      toast({ title: "Welcome back!", description: "You've been signed in successfully." });
      onClose();
    } else {
      setError(result.message || "Sign in failed");
    }
  };

  const handleSignUp = async (formData: FormData) => {
    setError("");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const username = email.split("@")[0]; // Generate username from email

    const result = await signUp({
      username,
      email,
      password,
      firstName,
      lastName,
    });
    
    if (result.success) {
      toast({ title: "Welcome to LUXE!", description: "Your account has been created successfully." });
      onClose();
    } else {
      setError(result.message || "Sign up failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Welcome to LUXE
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2" data-testid="auth-tabs">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <TabsContent value="signin" data-testid="signin-tab">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSignIn(formData);
            }} className="space-y-4">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <div className="relative">
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    required
                    data-testid="signin-email-input"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    data-testid="signin-password-input"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-charcoal text-white hover:bg-gray-800"
                disabled={isLoading}
                data-testid="signin-submit-button"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              
              <div className="text-center">
                <Button variant="link" className="text-sm text-brand-red">
                  Forgot password?
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" data-testid="signup-tab">
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSignUp(formData);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="signup-firstname">First Name</Label>
                  <Input
                    id="signup-firstname"
                    name="firstName"
                    placeholder="John"
                    required
                    data-testid="signup-firstname-input"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-lastname">Last Name</Label>
                  <Input
                    id="signup-lastname"
                    name="lastName"
                    placeholder="Doe"
                    required
                    data-testid="signup-lastname-input"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    required
                    data-testid="signup-email-input"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    data-testid="signup-password-input"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    data-testid="signup-confirm-password-input"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-charcoal text-white hover:bg-gray-800"
                disabled={isLoading}
                data-testid="signup-submit-button"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              
              <p className="text-xs text-center text-medium-gray">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
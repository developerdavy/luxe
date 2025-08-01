import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-charcoal">
            {isSignUp ? "Sign Up" : "Sign In"}
          </DialogTitle>
        </DialogHeader>
        
        {/* Sign In Form */}
        {!isSignUp && (
          <div className="space-y-4" data-testid="signin-form">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Email Address"
                data-testid="signin-email-input"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Password"
                data-testid="signin-password-input"
              />
            </div>
            
            <Button 
              className="w-full bg-charcoal text-white hover:bg-gray-800"
              data-testid="signin-submit-button"
            >
              Sign In
            </Button>
            
            <div className="text-center">
              <p className="text-medium-gray">
                Don't have an account?{" "}
                <button 
                  onClick={() => setIsSignUp(true)}
                  className="text-brand-red hover:text-red-700 font-medium"
                  data-testid="switch-to-signup"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        )}
        
        {/* Sign Up Form */}
        {isSignUp && (
          <div className="space-y-4" data-testid="signup-form">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                type="text" 
                placeholder="Full Name"
                data-testid="signup-name-input"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Email Address"
                data-testid="signup-email-input"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Password"
                data-testid="signup-password-input"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                type="password" 
                placeholder="Confirm Password"
                data-testid="signup-confirm-password-input"
              />
            </div>
            
            <Button 
              className="w-full bg-charcoal text-white hover:bg-gray-800"
              data-testid="signup-submit-button"
            >
              Create Account
            </Button>
            
            <div className="text-center">
              <p className="text-medium-gray">
                Already have an account?{" "}
                <button 
                  onClick={() => setIsSignUp(false)}
                  className="text-brand-red hover:text-red-700 font-medium"
                  data-testid="switch-to-signin"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

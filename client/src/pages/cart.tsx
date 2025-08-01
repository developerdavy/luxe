import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ArrowLeft, User } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import AuthModal from "@/components/auth-modal";
import { useState } from "react";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12" data-testid="auth-required-cart">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <User className="h-16 w-16 text-medium-gray mx-auto mb-4" />
            <h1 className="text-3xl font-light text-charcoal mb-4">Sign In Required</h1>
            <p className="text-medium-gray mb-8">Please sign in to view and manage your shopping cart</p>
            <Button 
              className="bg-charcoal text-white hover:bg-gray-800" 
              onClick={() => setIsAuthOpen(true)}
              data-testid="signin-to-view-cart"
            >
              Sign In to Continue
            </Button>
          </div>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12" data-testid="empty-cart-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-light text-charcoal mb-4">Your Cart is Empty</h1>
            <p className="text-medium-gray mb-8">Add some products to get started</p>
            <Link href="/shop">
              <Button className="bg-charcoal text-white hover:bg-gray-800" data-testid="continue-shopping-empty">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12" data-testid="cart-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link href="/shop">
            <Button variant="ghost" data-testid="back-to-shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-light text-charcoal mb-8" data-testid="cart-title">
          Shopping Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4" data-testid={`cart-item-${item.id}`}>
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        data-testid={`cart-item-image-${item.id}`}
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-charcoal" data-testid={`cart-item-name-${item.id}`}>
                          {item.name}
                        </h3>
                        <p className="text-sm text-medium-gray" data-testid={`cart-item-size-${item.id}`}>
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-medium-gray" data-testid={`cart-item-price-${item.id}`}>
                          ${item.price}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          data-testid={`decrease-quantity-${item.id}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-12 text-center" data-testid={`quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          data-testid={`increase-quantity-${item.id}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-charcoal" data-testid={`cart-item-total-${item.id}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-brand-red hover:text-red-700 mt-2"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium text-charcoal mb-6" data-testid="order-summary-title">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Subtotal:</span>
                    <span className="text-charcoal" data-testid="cart-subtotal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Shipping:</span>
                    <span className="text-charcoal">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Tax:</span>
                    <span className="text-charcoal" data-testid="cart-tax">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-charcoal">Total:</span>
                    <span className="text-charcoal" data-testid="cart-total">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <Button 
                    className="w-full mt-6 bg-charcoal text-white hover:bg-gray-800"
                    data-testid="proceed-to-checkout"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/auth-modal";

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: ""
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Require authentication for checkout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12" data-testid="auth-required-checkout">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <User className="h-16 w-16 text-medium-gray mx-auto mb-4" />
            <h1 className="text-3xl font-light text-charcoal mb-4">Sign In Required</h1>
            <p className="text-medium-gray mb-8">Please sign in to complete your checkout</p>
            <Button 
              className="bg-charcoal text-white hover:bg-gray-800" 
              onClick={() => setIsAuthOpen(true)}
              data-testid="signin-to-checkout"
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
      <div className="min-h-screen py-12" data-testid="empty-checkout">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-light text-charcoal mb-4">Your Cart is Empty</h1>
            <p className="text-medium-gray mb-8">Add some products before checkout</p>
            <Link href="/shop">
              <Button className="bg-charcoal text-white hover:bg-gray-800">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode ||
        !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate order processing
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly."
    });

    clearCart();
    // In a real app, you would redirect to a success page
  };

  return (
    <div className="py-12" data-testid="checkout-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button variant="ghost" data-testid="back-to-cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-light text-charcoal mb-8" data-testid="checkout-title">
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Forms */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="shipping-form-title">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      data-testid="input-firstName"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      data-testid="input-lastName"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input 
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    data-testid="input-address"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      data-testid="input-city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input 
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      data-testid="input-zipCode"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select value={shippingInfo.country} onValueChange={(value) => setShippingInfo({...shippingInfo, country: value})}>
                    <SelectTrigger data-testid="select-country">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="payment-form-title">Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input 
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    data-testid="input-cardNumber"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input 
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      data-testid="input-expiryDate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input 
                      id="cvv"
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      data-testid="input-cvv"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name *</Label>
                  <Input 
                    id="cardholderName"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                    data-testid="input-cardholderName"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <Card>
              <CardHeader>
                <CardTitle data-testid="order-summary-title">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center" data-testid={`checkout-item-${item.id}`}>
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                          data-testid={`checkout-item-image-${item.id}`}
                        />
                        <div>
                          <h4 className="font-medium text-charcoal" data-testid={`checkout-item-name-${item.id}`}>
                            {item.name}
                          </h4>
                          <p className="text-sm text-medium-gray" data-testid={`checkout-item-details-${item.id}`}>
                            Size: {item.size} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold" data-testid={`checkout-item-total-${item.id}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator className="mb-6" />
                
                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Subtotal:</span>
                    <span className="text-charcoal" data-testid="checkout-subtotal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Shipping:</span>
                    <span className="text-charcoal">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-medium-gray">Tax:</span>
                    <span className="text-charcoal" data-testid="checkout-tax">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                    <span className="text-charcoal">Total:</span>
                    <span className="text-charcoal" data-testid="checkout-total">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full mt-6 bg-charcoal text-white hover:bg-gray-800"
                  data-testid="place-order-button"
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

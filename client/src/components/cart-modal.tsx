import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";

export default function CartModal() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalPrice } = useCart();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md" data-testid="cart-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-charcoal">Shopping Cart</DialogTitle>
        </DialogHeader>
        
        {/* Cart Items */}
        <div className="space-y-4 mb-6" data-testid="cart-items">
          {items.length === 0 ? (
            <div className="text-center text-medium-gray py-8">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p data-testid="empty-cart-message">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b" data-testid={`cart-item-${item.id}`}>
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                  data-testid={`cart-item-image-${item.id}`}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-charcoal" data-testid={`cart-item-name-${item.id}`}>
                    {item.name}
                  </h4>
                  <p className="text-sm text-medium-gray" data-testid={`cart-item-size-${item.id}`}>
                    Size: {item.size}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      data-testid={`decrease-quantity-${item.id}`}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-8 text-center" data-testid={`cart-item-quantity-${item.id}`}>
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      data-testid={`increase-quantity-${item.id}`}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-charcoal" data-testid={`cart-item-total-${item.id}`}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-brand-red hover:text-red-700 mt-2"
                    onClick={() => removeItem(item.id)}
                    data-testid={`remove-item-${item.id}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t pt-4" data-testid="cart-summary">
            <div className="flex justify-between text-lg font-medium text-charcoal mb-4">
              <span>Total:</span>
              <span data-testid="cart-total">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <Link href="/cart">
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  data-testid="view-cart-button"
                >
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout">
                <Button 
                  className="w-full bg-charcoal text-white hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                  data-testid="checkout-button"
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

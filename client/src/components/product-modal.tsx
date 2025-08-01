import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Truck, RotateCcw, Shield, User } from "lucide-react";
import { type Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/auth-modal";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }

    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      size: selectedSize || "One Size",
      quantity,
      imageUrl: product.imageUrl || ""
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl" data-testid="product-modal">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img 
                src={product.imageUrl || ''} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                data-testid="modal-product-image"
              />
            </div>
            {/* Thumbnail images would go here */}
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <DialogHeader>
              <DialogTitle 
                className="text-3xl font-light text-charcoal mb-4"
                data-testid="modal-product-name"
              >
                {product.name}
              </DialogTitle>
            </DialogHeader>
            
            <p 
              className="text-2xl font-semibold text-charcoal mb-6"
              data-testid="modal-product-price"
            >
              ${product.price}
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-charcoal mb-2">Description</h4>
              <p 
                className="text-medium-gray leading-relaxed"
                data-testid="modal-product-description"
              >
                {product.description}
              </p>
            </div>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-charcoal mb-3">Size</h4>
                <div className="flex flex-wrap gap-2" data-testid="size-selector">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-brand-red hover:bg-red-700" : ""}
                      data-testid={`size-option-${size}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-charcoal mb-3">Quantity</h4>
              <div className="flex items-center space-x-3" data-testid="quantity-selector">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="quantity-decrease"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span 
                  className="px-4 py-2 border border-gray-300 rounded-lg w-16 text-center"
                  data-testid="quantity-display"
                >
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="quantity-increase"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-charcoal text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mb-4"
              data-testid="add-to-cart-button"
            >
              Add to Cart
            </Button>
            
            {/* Product Features */}
            <div className="text-sm text-medium-gray space-y-2">
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                <span data-testid="shipping-info">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                <span data-testid="return-policy">30-day return policy</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span data-testid="warranty-info">2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </Dialog>
  );
}

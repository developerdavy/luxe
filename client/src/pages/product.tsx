import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Truck, RotateCcw, Shield, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

export default function ProductPage() {
  const [, params] = useRoute("/product/:slug");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products/slug", params?.slug],
    queryFn: () => fetch(`/api/products/slug/${params?.slug}`).then(res => res.json()),
    enabled: !!params?.slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="product-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
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
  };

  return (
    <div className="py-12" data-testid="product-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Shop */}
        <Link href="/shop">
          <Button variant="ghost" className="mb-8" data-testid="back-to-shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={product.imageUrl || ''} 
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="product-main-image"
              />
            </div>
            {/* Additional product images would go here */}
          </div>
          
          {/* Product Details */}
          <div>
            {product.featured && (
              <Badge className="mb-4 bg-brand-red" data-testid="featured-badge">
                Featured
              </Badge>
            )}
            
            <h1 className="text-4xl font-light text-charcoal mb-4" data-testid="product-name">
              {product.name}
            </h1>
            
            <p className="text-3xl font-semibold text-charcoal mb-6" data-testid="product-price">
              ${product.price}
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-charcoal mb-3">Description</h3>
              <p className="text-medium-gray leading-relaxed" data-testid="product-description">
                {product.description}
              </p>
            </div>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-charcoal mb-4">Size</h3>
                <div className="flex flex-wrap gap-2" data-testid="size-selector">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "bg-brand-red hover:bg-red-700" : ""}
                      data-testid={`size-${size}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-charcoal mb-4">Quantity</h3>
              <div className="flex items-center space-x-4" data-testid="quantity-selector">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="decrease-quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center" data-testid="quantity-display">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="increase-quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <Button 
              onClick={handleAddToCart}
              size="lg"
              className="w-full mb-8 bg-charcoal text-white hover:bg-gray-800"
              data-testid="add-to-cart"
            >
              Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}
            </Button>
            
            {/* Product Features */}
            <div className="space-y-4 text-sm text-medium-gray">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-3" />
                <span data-testid="shipping-info">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 mr-3" />
                <span data-testid="return-policy">30-day return policy</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-3" />
                <span data-testid="warranty">2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

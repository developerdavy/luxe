import { Button } from "@/components/ui/button";
import { type Product } from "@shared/schema";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <div 
      className="group cursor-pointer"
      data-testid={`product-card-${product.id}`}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link href={`/product/${product.slug}`}>
          <a>
            <img 
              src={product.imageUrl || ''} 
              alt={product.name} 
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              data-testid={`product-image-${product.id}`}
            />
          </a>
        </Link>
        <div className="p-6">
          <Link href={`/product/${product.slug}`}>
            <a>
              <h3 
                className="text-lg font-medium text-charcoal mb-2 hover:text-brand-red transition-colors"
                data-testid={`product-name-${product.id}`}
              >
                {product.name}
              </h3>
            </a>
          </Link>
          <p 
            className="text-medium-gray text-sm mb-3"
            data-testid={`product-description-${product.id}`}
          >
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <p 
              className="text-xl font-semibold text-charcoal"
              data-testid={`product-price-${product.id}`}
            >
              ${product.price}
            </p>
            {onQuickView && (
              <Button 
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                className="text-brand-red hover:text-red-700 font-medium"
                data-testid={`quick-view-${product.id}`}
              >
                Quick View
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

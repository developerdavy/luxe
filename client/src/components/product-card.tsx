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
          <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden bg-gray-100">
            <img 
              src={product.imageUrl || ''} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-testid={`product-image-${product.id}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
              }}
              loading="lazy"
            />
          </div>
        </Link>
        <div className="p-4 sm:p-6">
          <Link href={`/product/${product.slug}`}>
            <h3 
              className="text-lg font-medium text-charcoal mb-2 hover:text-brand-red transition-colors"
              data-testid={`product-name-${product.id}`}
            >
              {product.name}
            </h3>
          </Link>
          <p 
            className="text-medium-gray text-sm mb-3"
            data-testid={`product-description-${product.id}`}
          >
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <p 
              className="text-lg sm:text-xl font-semibold text-charcoal"
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
                className="text-brand-red hover:text-red-700 font-medium text-sm sm:text-base"
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

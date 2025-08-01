import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/product-card";
import ProductModal from "@/components/product-modal";
import { type Product, type Category } from "@shared/schema";

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  
  const categoryFromUrl = searchParams.get('category') || 'all';
  const saleFromUrl = searchParams.get('sale') === 'true';
  
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Use URL parameters directly instead of local state
  const selectedCategory = categoryFromUrl;

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Handle sale filter
      if (saleFromUrl) {
        return product.featured; // Using featured as sale items for now
      }
      
      // Handle category filter
      if (selectedCategory === 'all') return true;
      const category = categories.find(cat => cat.slug === selectedCategory);
      // Debug filtering
      return product.categoryId === category?.id;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'newest':
          return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
        case 'featured':
        default:
          return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
      }
    });

  return (
    <div className="py-12" data-testid="shop-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-charcoal mb-2" data-testid="shop-title">
            {saleFromUrl ? 'Sale Items' : 
             selectedCategory === 'all' ? 'All Products' : 
             categories.find(cat => cat.slug === selectedCategory)?.name || 'Products'}
          </h1>
          <p className="text-medium-gray" data-testid="shop-subtitle">
            {saleFromUrl ? 'Special offers and featured items' :
             selectedCategory === 'all' ? 'Discover our complete collection' :
             categories.find(cat => cat.slug === selectedCategory)?.description || 'Browse our curated selection'}
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={(value) => {
              if (value === 'all') {
                window.location.href = '/shop';
              } else {
                window.location.href = `/shop?category=${value}`;
              }
            }}>
              <SelectTrigger className="w-48" data-testid="category-filter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48" data-testid="sort-filter">
              <SelectValue placeholder="Sort by: Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Sort by: Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Debug Info */}
        <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
          <p>URL: {location}</p>
          <p>Selected Category: {selectedCategory}</p>
          <p>Sale Mode: {saleFromUrl ? 'Yes' : 'No'}</p>
          <p>Total Products: {products.length}</p>
          <p>Filtered Products: {filteredProducts.length}</p>
          <p>Categories Loaded: {categories.length}</p>
          {categories.length > 0 && (
            <p>Available Category Slugs: {categories.map(c => c.slug).join(', ')}</p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={setSelectedProduct}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12" data-testid="no-products-message">
            <p className="text-medium-gray text-lg">No products found matching your criteria.</p>
            <p className="text-sm text-gray-500 mt-2">
              Debug: Category: {selectedCategory}, Sale: {saleFromUrl ? 'true' : 'false'}, 
              Total products: {products.length}, Categories: {categories.length}
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

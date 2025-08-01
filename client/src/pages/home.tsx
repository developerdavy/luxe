import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Star, Truck, RotateCcw, Shield, Heart, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import { type Product, type Category } from "@shared/schema";

export default function Home() {
  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <main data-testid="home-page">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center" data-testid="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide" data-testid="hero-title">
            New Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light" data-testid="hero-subtitle">
            Discover the latest in contemporary fashion
          </p>
          <Link href="/shop">
            <Button 
              className="bg-white text-charcoal px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              data-testid="hero-cta-button"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-charcoal mb-4" data-testid="categories-title">
              Shop by Category
            </h2>
            <p className="text-lg text-medium-gray" data-testid="categories-subtitle">
              Discover our curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/shop?category=${category.slug}`}>
                <div className="group cursor-pointer" data-testid={`category-card-${category.slug}`}>
                  <div className="relative overflow-hidden bg-white rounded-lg shadow-sm">
                    <img 
                      src={category.imageUrl || ''} 
                      alt={category.name}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                      data-testid={`category-image-${category.slug}`}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-medium mb-2" data-testid={`category-name-${category.slug}`}>
                        {category.name}
                      </h3>
                      <p className="text-sm opacity-90" data-testid={`category-description-${category.slug}`}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-charcoal mb-4" data-testid="featured-title">
              New Arrivals
            </h2>
            <p className="text-lg text-medium-gray" data-testid="featured-subtitle">
              Fresh pieces for your wardrobe
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button 
                className="bg-charcoal text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors duration-200"
                data-testid="view-all-products-button"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-shipping">
              <div className="w-16 h-16 bg-brand-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-lg font-medium text-charcoal mb-2">Free Shipping</h3>
              <p className="text-medium-gray">Free shipping on all orders over $100</p>
            </div>
            <div className="text-center" data-testid="feature-returns">
              <div className="w-16 h-16 bg-brand-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-lg font-medium text-charcoal mb-2">Easy Returns</h3>
              <p className="text-medium-gray">30-day hassle-free return policy</p>
            </div>
            <div className="text-center" data-testid="feature-warranty">
              <div className="w-16 h-16 bg-brand-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-lg font-medium text-charcoal mb-2">Quality Guarantee</h3>
              <p className="text-medium-gray">2-year warranty on all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gray-50" data-testid="reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-charcoal mb-4" data-testid="reviews-title">
              What Our Customers Say
            </h2>
            <p className="text-lg text-medium-gray" data-testid="reviews-subtitle">
              Trusted by thousands of fashion enthusiasts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Sarah Johnson",
                rating: 5,
                text: "Amazing quality and fast shipping! The silk blouse exceeded my expectations.",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                id: 2,
                name: "Michael Chen",
                rating: 5,
                text: "Perfect fit and excellent customer service. Will definitely shop here again!",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
              {
                id: 3,
                name: "Emma Davis",
                rating: 5,
                text: "Love the sustainable approach and timeless designs. LUXE is my go-to brand.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              }
            ].map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm" data-testid={`review-${review.id}`}>
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-medium-gray mb-4 italic">"{review.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-charcoal">{review.name}</p>
                    <p className="text-sm text-medium-gray">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-charcoal" data-testid="newsletter-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="h-12 w-12 text-brand-red mx-auto mb-4" />
            <h2 className="text-4xl font-light text-white mb-4" data-testid="newsletter-title">
              Stay In Style
            </h2>
            <p className="text-xl text-gray-300" data-testid="newsletter-subtitle">
              Get the latest trends and exclusive offers delivered to your inbox
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg border-0 focus:outline-none focus:ring-2 focus:ring-brand-red"
              data-testid="newsletter-email-input"
            />
            <Button 
              className="bg-brand-red text-white px-8 py-3 rounded-r-lg sm:rounded-l-none rounded-l-lg hover:bg-red-700 transition-colors duration-200"
              data-testid="newsletter-subscribe-button"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <p className="text-gray-400 text-sm mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-20 bg-brand-red" data-testid="sale-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white text-brand-red mb-4" data-testid="sale-badge">
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4" data-testid="sale-title">
            End of Season Sale
          </h2>
          <p className="text-xl text-white mb-8 opacity-90" data-testid="sale-subtitle">
            Up to 70% off selected items
          </p>
          <Link href="/shop?sale=true">
            <Button 
              className="bg-white text-brand-red px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors duration-200"
              data-testid="sale-cta-button"
            >
              Shop Sale
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

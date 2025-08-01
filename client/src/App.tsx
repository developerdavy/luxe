import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartModal from "@/components/cart-modal";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

import Home from "@/pages/home";
import Shop from "@/pages/shop";
import MenPage from "@/pages/men";
import WomenPage from "@/pages/women";
import FootwearPage from "@/pages/footwear";
import AccessoriesPage from "@/pages/accessories";
import OuterwearPage from "@/pages/outerwear";
import SalePage from "@/pages/sale";
import ProductPage from "@/pages/product";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/men" component={MenPage} />
      <Route path="/women" component={WomenPage} />
      <Route path="/footwear" component={FootwearPage} />
      <Route path="/accessories" component={AccessoriesPage} />
      <Route path="/outerwear" component={OuterwearPage} />
      <Route path="/sale" component={SalePage} />
      <Route path="/product/:slug" component={ProductPage} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />

      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { checkAuth } = useAuth();

  // Initialize authentication on app start
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Trigger admin panel with Ctrl+Shift+A (case insensitive)
      if (event.ctrlKey && event.shiftKey && (event.key === 'A' || event.key === 'a')) {
        event.preventDefault();
        setShowAdmin(true);
      }
      // Close admin panel with Escape
      if (event.key === 'Escape' && showAdmin) {
        setShowAdmin(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showAdmin]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col" data-testid="app">
          <Navbar />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <CartModal />
          <Toaster />
          
          {/* Admin Panel Modal */}
          {showAdmin && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Admin Panel</h2>
                  <button
                    onClick={() => setShowAdmin(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  <AdminPage />
                </div>
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;

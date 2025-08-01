import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartModal from "@/components/cart-modal";

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
      <Route path="/admin-dashboard-luxe-secret" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

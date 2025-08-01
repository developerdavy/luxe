import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Edit, Plus, Package, Users, ShoppingCart, DollarSign, Lock } from "lucide-react";
import { type Product, type Category, insertProductSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showPasswordDialog, setShowPasswordDialog] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { toast } = useToast();

  // Always call hooks at the top level - never conditionally
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  const addProductMutation = useMutation({
    mutationFn: (productData: any) => 
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product added successfully!" });
      setIsAddingProduct(false);
    },
    onError: () => {
      toast({ title: "Failed to add product", variant: "destructive" });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product updated successfully!" });
      setEditingProduct(null);
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => 
      fetch(`/api/products/${id}`, {
        method: 'DELETE',
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    }
  });

  // Check if already authenticated from sessionStorage
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin-authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      setShowPasswordDialog(false);
    }
  }, []);
  
  const handleAdminLogin = () => {
    // Simple password check - in production, this should be server-side
    if (adminPassword === "luxe-admin-2025") {
      setIsAuthenticated(true);
      setShowPasswordDialog(false);
      sessionStorage.setItem('admin-authenticated', 'true');
      toast({ title: "Welcome to LUXE Admin Dashboard" });
    } else {
      toast({ title: "Invalid password", variant: "destructive" });
      setAdminPassword("");
    }
  };

  const handleSubmitProduct = (formData: FormData) => {
    const productData = {
      name: formData.get('name') as string,
      slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      categoryId: formData.get('categoryId') as string,
      imageUrl: formData.get('imageUrl') as string,
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean),
      featured: formData.get('featured') === 'true',
      inStock: true
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      addProductMutation.mutate(productData);
    }
  };

  const adminStats = {
    totalProducts: products.length,
    featuredProducts: products.filter(p => p.featured).length,
    totalRevenue: products.reduce((sum, p) => sum + parseFloat(p.price), 0),
    avgPrice: products.length > 0 ? products.reduce((sum, p) => sum + parseFloat(p.price), 0) / products.length : 0
  };

  // If not authenticated, show password dialog
  if (!isAuthenticated) {
    return (
      <Dialog open={showPasswordDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the admin password to access the dashboard.
            </p>
            <Input
              type="password"
              placeholder="Admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <Button onClick={handleAdminLogin} className="w-full">
              Access Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="p-6" data-testid="admin-page">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal mb-2" data-testid="admin-title">
            Admin Dashboard
          </h1>
          <p className="text-medium-gray">Manage your LUXE store</p>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: Package },
            { id: 'products', label: 'Products', icon: ShoppingCart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedTab === tab.id 
                    ? 'bg-charcoal text-white' 
                    : 'text-charcoal hover:bg-gray-100'
                }`}
                data-testid={`admin-tab-${tab.id}`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6" data-testid="admin-overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-medium-gray">Total Products</p>
                      <p className="text-2xl font-bold text-charcoal">{adminStats.totalProducts}</p>
                    </div>
                    <Package className="h-8 w-8 text-brand-red" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-medium-gray">Featured Products</p>
                      <p className="text-2xl font-bold text-charcoal">{adminStats.featuredProducts}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-brand-red" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-medium-gray">Avg Price</p>
                      <p className="text-2xl font-bold text-charcoal">${adminStats.avgPrice.toFixed(0)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-brand-red" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-medium-gray">Categories</p>
                      <p className="text-2xl font-bold text-charcoal">{categories.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-brand-red" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.imageUrl || ''} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-charcoal">{product.name}</h4>
                          <p className="text-sm text-medium-gray">${product.price}</p>
                        </div>
                      </div>
                      {product.featured && <Badge className="bg-brand-red">Featured</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {selectedTab === 'products' && (
          <div className="space-y-6" data-testid="admin-products">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-charcoal">Product Management</h2>
              <Button 
                onClick={() => setIsAddingProduct(true)}
                className="bg-brand-red text-white hover:bg-red-700"
                data-testid="add-product-button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Product Form */}
            {(isAddingProduct || editingProduct) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSubmitProduct(formData);
                  }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          defaultValue={editingProduct?.name}
                          required
                          data-testid="product-name-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input 
                          id="price" 
                          name="price" 
                          type="number" 
                          step="0.01"
                          defaultValue={editingProduct?.price}
                          required
                          data-testid="product-price-input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        defaultValue={editingProduct?.description || ''}
                        data-testid="product-description-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="categoryId">Category</Label>
                        <Select name="categoryId" defaultValue={editingProduct?.categoryId || ''}>
                          <SelectTrigger data-testid="product-category-select">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input 
                          id="imageUrl" 
                          name="imageUrl"
                          defaultValue={editingProduct?.imageUrl || ''}
                          data-testid="product-image-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sizes">Sizes (comma separated)</Label>
                        <Input 
                          id="sizes" 
                          name="sizes"
                          placeholder="S, M, L, XL"
                          defaultValue={editingProduct?.sizes?.join(', ') || ''}
                          data-testid="product-sizes-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="featured">Featured Product</Label>
                        <Select name="featured" defaultValue={editingProduct?.featured ? 'true' : 'false'}>
                          <SelectTrigger data-testid="product-featured-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        type="submit" 
                        className="bg-charcoal text-white hover:bg-gray-800"
                        disabled={addProductMutation.isPending || updateProductMutation.isPending}
                        data-testid="save-product-button"
                      >
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setIsAddingProduct(false);
                          setEditingProduct(null);
                        }}
                        data-testid="cancel-product-button"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>All Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex items-center justify-between p-4 border rounded-lg"
                      data-testid={`admin-product-${product.id}`}
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={product.imageUrl || ''} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-charcoal">{product.name}</h4>
                          <p className="text-sm text-medium-gray">${product.price}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {product.featured && (
                              <Badge className="bg-brand-red text-xs">Featured</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {categories.find(c => c.id === product.categoryId)?.name}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                          data-testid={`edit-product-${product.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this product?')) {
                              deleteProductMutation.mutate(product.id);
                            }
                          }}
                          data-testid={`delete-product-${product.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
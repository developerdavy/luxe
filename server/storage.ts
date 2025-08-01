import { 
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(filters?: { categoryId?: string; featured?: boolean }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Cart
  getCartItems(userId: string): Promise<CartItem[]>;
  addCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<void>;
  
  // Orders
  getOrders(userId?: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  addOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private categories: Map<string, Category> = new Map();
  private products: Map<string, Product> = new Map();
  private cartItems: Map<string, CartItem> = new Map();
  private orders: Map<string, Order> = new Map();
  private orderItems: Map<string, OrderItem> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categories = [
      { id: "cat-1", name: "Men's Wear", slug: "mens-wear", description: "Contemporary styles for the modern man", imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: "cat-2", name: "Women's Wear", slug: "womens-wear", description: "Elegant designs for every occasion", imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: "cat-3", name: "Footwear", slug: "footwear", description: "Step up your style game", imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
    ];

    categories.forEach(cat => this.categories.set(cat.id, cat));

    // Seed products
    const products = [
      {
        id: "prod-1",
        name: "Classic White Tee",
        slug: "classic-white-tee",
        description: "Essential wardrobe staple made from premium cotton for ultimate comfort and durability. Features a classic fit that works perfectly on its own or as a layering piece.",
        price: "29.00",
        categoryId: "cat-1",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "prod-2",
        name: "Slim Fit Denim",
        slug: "slim-fit-denim",
        description: "Premium stretch denim with contemporary cut. Made from high-quality cotton blend for comfort and durability.",
        price: "89.00",
        categoryId: "cat-1",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["28", "30", "32", "34", "36"],
        inStock: true,
        featured: false,
        createdAt: new Date()
      },
      {
        id: "prod-3",
        name: "Casual Blazer",
        slug: "casual-blazer",
        description: "Tailored fit blazer perfect for any occasion. Versatile piece that transitions from business to casual effortlessly.",
        price: "189.00",
        categoryId: "cat-1",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "prod-4",
        name: "Silk Blouse",
        slug: "silk-blouse",
        description: "Luxurious 100% silk fabric blouse with elegant draping. Perfect for professional and evening wear.",
        price: "149.00",
        categoryId: "cat-2",
        imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["XS", "S", "M", "L"],
        inStock: true,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "prod-5",
        name: "Evening Dress",
        slug: "evening-dress",
        description: "Sophisticated elegance for special events. Features premium fabric and impeccable tailoring.",
        price: "249.00",
        categoryId: "cat-2",
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "prod-6",
        name: "Designer Handbag",
        slug: "designer-handbag",
        description: "Premium leather handbag with gold accents. Spacious interior with multiple compartments.",
        price: "299.00",
        categoryId: "cat-2",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["One Size"],
        inStock: true,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "prod-7",
        name: "Leather Boots",
        slug: "leather-boots",
        description: "Handcrafted genuine leather boots with durable construction. Perfect for both casual and formal occasions.",
        price: "199.00",
        categoryId: "cat-3",
        imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["7", "8", "9", "10", "11", "12"],
        inStock: true,
        featured: false,
        createdAt: new Date()
      },
      {
        id: "prod-8",
        name: "Premium Sneakers",
        slug: "premium-sneakers",
        description: "Comfort meets contemporary style. High-quality materials with superior cushioning technology.",
        price: "159.00",
        categoryId: "cat-3",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["7", "8", "9", "10", "11", "12"],
        inStock: true,
        featured: true,
        createdAt: new Date()
      },
      {
        id: "prod-9",
        name: "Running Shoes",
        slug: "running-shoes",
        description: "Performance athletic footwear designed for runners. Lightweight with excellent support and breathability.",
        price: "119.00",
        categoryId: "cat-3",
        imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["7", "8", "9", "10", "11", "12"],
        inStock: true,
        featured: false,
        createdAt: new Date()
      },
      {
        id: "prod-10",
        name: "Comfort Hoodie",
        slug: "comfort-hoodie",
        description: "Soft cotton blend fabric hoodie perfect for casual wear. Features kangaroo pocket and adjustable hood.",
        price: "59.00",
        categoryId: "cat-1",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: false,
        createdAt: new Date()
      }
    ];

    products.forEach(prod => this.products.set(prod.id, prod));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: false,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Products
  async getProducts(filters?: { categoryId?: string; featured?: boolean }): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (filters?.categoryId) {
      products = products.filter(p => p.categoryId === filters.categoryId);
    }
    
    if (filters?.featured !== undefined) {
      products = products.filter(p => p.featured === filters.featured);
    }
    
    return products.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(p => p.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Cart
  async getCartItems(userId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
  }

  async addCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id, 
      createdAt: new Date() 
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeCartItem(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: string): Promise<void> {
    const userCartItems = Array.from(this.cartItems.entries())
      .filter(([, item]) => item.userId === userId);
    
    userCartItems.forEach(([id]) => this.cartItems.delete(id));
  }

  // Orders
  async getOrders(userId?: string): Promise<Order[]> {
    let orders = Array.from(this.orders.values());
    
    if (userId) {
      orders = orders.filter(order => order.userId === userId);
    }
    
    return orders.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async addOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
}

export const storage = new MemStorage();

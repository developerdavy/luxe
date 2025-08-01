import { db } from "./db";
import { categories, products } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Seed categories
  const categoriesData = [
    { id: "cat-1", name: "Men's Wear", slug: "mens-wear", description: "Contemporary styles for the modern man", imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: "cat-2", name: "Women's Wear", slug: "womens-wear", description: "Elegant designs for every occasion", imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: "cat-3", name: "Footwear", slug: "footwear", description: "Step up your style game", imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: "cat-4", name: "Accessories", slug: "accessories", description: "Complete your look with premium accessories", imageUrl: "https://images.unsplash.com/photo-1523170335258-f5c6c6bd6edb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: "cat-5", name: "Outerwear", slug: "outerwear", description: "Stay stylish in all weather conditions", imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: "cat-6", name: "Activewear", slug: "activewear", description: "Performance meets style", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  try {
    await db.insert(categories).values(categoriesData).onConflictDoNothing();
    console.log("✅ Categories seeded");
  } catch (error) {
    console.log("Categories may already exist, continuing...");
  }

  // Seed more comprehensive products
  const productsData = [
    // Men's Wear
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
      featured: true
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
      featured: false
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
      featured: true
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
      featured: true
    },
    {
      id: "prod-25",
      name: "Leather Belt",
      slug: "leather-belt",
      description: "Premium genuine leather belt with sleek metal buckle. Perfect finishing touch for any outfit.",
      price: "79.00",
      categoryId: "cat-4",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      featured: true
    },
    {
      id: "prod-26",
      name: "Luxury Watch",
      slug: "luxury-watch",
      description: "Elegant timepiece with Swiss movement and sapphire crystal. Sophisticated accessory for the discerning individual.",
      price: "399.00",
      categoryId: "cat-4",
      imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["One Size"],
      inStock: true,
      featured: true
    },
    {
      id: "prod-29",
      name: "Wool Coat",
      slug: "wool-coat",
      description: "Classic wool overcoat with timeless design. Perfect for cold weather and formal occasions.",
      price: "359.00",
      categoryId: "cat-5",
      imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      featured: true
    },
    // Women's Wear  
    {
      id: "prod-5",
      name: "Maxi Dress",
      slug: "maxi-dress", 
      description: "Flowing maxi dress perfect for summer occasions. Lightweight fabric with elegant silhouette.",
      price: "129.00",
      categoryId: "cat-2",
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["XS", "S", "M", "L"],
      inStock: true,
      featured: false
    },
    {
      id: "prod-6", 
      name: "Cashmere Sweater",
      slug: "cashmere-sweater",
      description: "Luxurious 100% cashmere sweater with timeless design. Perfect for layering or wearing alone.",
      price: "249.00",
      categoryId: "cat-2", 
      imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["XS", "S", "M", "L", "XL"],
      inStock: true,
      featured: true
    },
    // Footwear
    {
      id: "prod-7",
      name: "Classic Sneakers",
      slug: "classic-sneakers",
      description: "Versatile white sneakers perfect for casual wear. Premium leather construction for durability.",
      price: "89.00",
      categoryId: "cat-3",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      inStock: true,
      featured: true
    },
    {
      id: "prod-8",
      name: "High Heels",
      slug: "high-heels",
      description: "Elegant high heels for special occasions. Comfortable fit with sophisticated design.",
      price: "159.00",
      categoryId: "cat-3",
      imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["5", "6", "7", "8", "9", "10"],
      inStock: true,
      featured: false
    },
    // Accessories
    {
      id: "prod-27",
      name: "Designer Sunglasses",
      slug: "designer-sunglasses",
      description: "Premium sunglasses with UV protection and stylish frame design.",
      price: "189.00",
      categoryId: "cat-4",
      imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["One Size"],
      inStock: true,
      featured: true
    },
    {
      id: "prod-28",
      name: "Silk Scarf",
      slug: "silk-scarf",
      description: "Luxurious silk scarf with elegant patterns. Perfect finishing touch for any outfit.",
      price: "79.00",
      categoryId: "cat-4",
      imageUrl: "https://images.unsplash.com/photo-1590736969955-00f68b430071?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["One Size"],
      inStock: true,
      featured: false
    },
    // Outerwear
    {
      id: "prod-30",
      name: "Denim Jacket",
      slug: "denim-jacket",
      description: "Classic denim jacket with modern fit. Perfect for layering and casual styling.",
      price: "129.00",
      categoryId: "cat-5",
      imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      featured: false
    },
    {
      id: "prod-31",
      name: "Trench Coat",
      slug: "trench-coat",
      description: "Timeless trench coat with water-resistant fabric. Essential for any wardrobe.",
      price: "299.00",
      categoryId: "cat-5",
      imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      featured: true
    },
    // Activewear
    {
      id: "prod-32",
      name: "Athletic Leggings",
      slug: "athletic-leggings",
      description: "High-performance leggings with moisture-wicking fabric and compression fit. Perfect for workouts.",
      price: "79.00",
      categoryId: "cat-6",
      imageUrl: "https://images.unsplash.com/photo-1506629905607-c7a0b43ac012?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["XS", "S", "M", "L", "XL"],
      inStock: true,
      featured: true
    },
    {
      id: "prod-33",
      name: "Performance Tank",
      slug: "performance-tank",
      description: "Breathable tank top designed for intense workouts. Quick-dry technology and comfortable fit.",
      price: "45.00",
      categoryId: "cat-6",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      sizes: ["XS", "S", "M", "L", "XL"],
      inStock: true,
      featured: false
    }
  ];

  try {
    await db.insert(products).values(productsData).onConflictDoNothing();
    console.log("✅ Products seeded");
  } catch (error) {
    console.log("Products may already exist, continuing...");
  }

  console.log("🎉 Database seeding completed!");
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };
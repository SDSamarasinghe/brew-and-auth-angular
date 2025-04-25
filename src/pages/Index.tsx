
import { useEffect, useState } from "react";
import ProductService, { Product } from "../services/product";
import ProductCard from "../components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getAllProducts();
        // Ensure products is always an array
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Extract unique categories from products, ensuring products is an array
  const categories = ["all", ...new Set(products.map(product => product.category))];
  
  // Filter products based on active category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Mock data for development if no products are returned from backend
  const useMockData = products.length === 0 && !loading;
  
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Espresso",
      description: "Strong, concentrated coffee served in a small cup.",
      price: 2.99,
      imageUrl: "https://images.unsplash.com/photo-1510707577719-ae7afe080542",
      category: "coffee"
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and milk foam.",
      price: 4.50,
      imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d",
      category: "coffee"
    },
    {
      id: 3,
      name: "Blueberry Muffin",
      description: "Moist muffin loaded with sweet blueberries.",
      price: 3.25,
      imageUrl: "https://images.unsplash.com/photo-1607958996333-41215c43da89",
      category: "pastry"
    },
    {
      id: 4,
      name: "Avocado Toast",
      description: "Toasted artisan bread topped with fresh avocado.",
      price: 7.95,
      imageUrl: "https://images.unsplash.com/photo-1603046891744-56236a46b714",
      category: "food"
    },
    {
      id: 5,
      name: "Chai Latte",
      description: "Spiced tea with steamed milk.",
      price: 4.25,
      imageUrl: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9",
      category: "tea"
    },
    {
      id: 6,
      name: "Croissant",
      description: "Buttery, flaky pastry shaped into a crescent.",
      price: 2.95,
      imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
      category: "pastry"
    },
  ];
  
  const displayProducts = useMockData ? mockProducts : filteredProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      {user && (
        <div className="mb-8 p-4 bg-cream-50 rounded-lg border border-cream-200">
          <h2 className="text-xl font-serif">Welcome back, {user.username}!</h2>
          <p className="text-muted-foreground">Ready for your daily brew?</p>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <Coffee className="h-6 w-6 text-coffee-600" />
          <h1 className="text-4xl font-serif font-medium text-coffee-900">Brew Haven Menu</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our handcrafted coffee, tea, and delicious food items made with the finest ingredients.
        </p>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <div className="flex justify-center">
          <TabsList className="bg-cream-50">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;

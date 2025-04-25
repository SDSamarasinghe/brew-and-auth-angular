
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "../contexts/CartContext";
import { Product } from "../services/product";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem(product);
    
    // Add animation to button - temporary class will be removed
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('animate-cart-added');
      setTimeout(() => {
        button.classList.remove('animate-cart-added');
      }, 300);
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl || "/placeholder.svg"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-medium">{product.name}</h3>
          <span className="text-coffee-700 font-medium">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-3">{product.description}</p>
        <div className="mt-2">
          <span className="inline-block bg-cream-100 text-coffee-800 px-2 py-0.5 text-xs rounded-full">
            {product.category}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart} 
          className="w-full"
          variant="default"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

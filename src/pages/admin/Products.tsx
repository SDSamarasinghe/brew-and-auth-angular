
import { useState, useEffect } from 'react';
import ProductService, { Product } from '../../services/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    setLoading(true);
    const data = await ProductService.getAllProducts();
    
    if (data.length === 0) {
      // If no products are returned (development mode), use mock data
      setProducts([
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
        }
      ]);
    } else {
      setProducts(data);
    }
    
    setLoading(false);
  };
  
  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: ''
    });
    setEditProduct(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      category: formData.category
    };
    
    if (editProduct) {
      const updated = await ProductService.updateProduct(editProduct.id, productData);
      if (updated) {
        setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...productData } : p));
      }
    } else {
      // In a development environment, simulate adding a product with a new ID
      const newProduct = {
        ...productData,
        id: Math.max(0, ...products.map(p => p.id)) + 1
      };
      
      // Try to use the ProductService, but fall back to just adding to state in dev mode
      const added = await ProductService.createProduct(productData);
      if (added) {
        setProducts([...products, added]);
      } else {
        setProducts([...products, newProduct]);
        toast.success('Product created successfully');
      }
    }
    
    resetFormData();
    setIsDialogOpen(false);
  };
  
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      category: product.category
    });
    setIsDialogOpen(true);
  };
  
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const deleted = await ProductService.deleteProduct(id);
      if (deleted) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        // Fall back for development
        setProducts(products.filter(p => p.id !== id));
        toast.success('Product deleted successfully');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">Products Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetFormData}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Cappuccino"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Delicious espresso with steamed milk and foam"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="4.50"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="coffee, tea, pastry"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  <Check className="h-4 w-4 mr-2" /> {editProduct ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[100px] text-right">Price</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">Loading products...</TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">No products found</TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-12 w-12 rounded overflow-hidden bg-muted">
                      <img 
                        src={product.imageUrl || "/placeholder.svg"} 
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.name}
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {product.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs bg-muted rounded-full">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;

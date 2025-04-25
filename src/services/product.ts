
import api from './api';
import { toast } from 'sonner';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const ProductService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch products');
      return [];
    }
  },

  getProductById: async (id: number): Promise<Product | null> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      toast.error(`Failed to fetch product with id ${id}`);
      return null;
    }
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product | null> => {
    try {
      const response = await api.post<Product>('/products', product);
      toast.success('Product created successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to create product');
      return null;
    }
  },

  updateProduct: async (id: number, product: Partial<Product>): Promise<Product | null> => {
    try {
      const response = await api.put<Product>(`/products/${id}`, product);
      toast.success('Product updated successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to update product');
      return null;
    }
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      return true;
    } catch (error) {
      toast.error('Failed to delete product');
      return false;
    }
  }
};

export default ProductService;

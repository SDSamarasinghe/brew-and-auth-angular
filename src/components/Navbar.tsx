
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Coffee, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-coffee-700" />
            <span className="text-xl font-serif font-medium">Brew Haven</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-foreground hover:text-coffee-700 transition">
              Menu
            </Link>
            <Link to="/about" className="text-foreground hover:text-coffee-700 transition">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-coffee-700 transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-foreground hover:text-coffee-700 transition" />
              {totalItems > 0 && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-coffee-500 text-white text-xs rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <div className="group relative">
                  <Button variant="ghost" className="p-1 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block border">
                    <div className="px-4 py-2 text-sm border-b">
                      <p className="font-medium">Hi, {user?.username}</p>
                      <p className="text-muted-foreground text-xs">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-muted">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-muted">
                      My Orders
                    </Link>
                    <button 
                      onClick={logout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-muted"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

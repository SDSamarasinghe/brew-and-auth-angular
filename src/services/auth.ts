
import api from './api';
import { toast } from 'sonner';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
}

const AuthService = {
  login: async (loginRequest: LoginRequest): Promise<User | null> => {
    try {
      const response = await api.post<AuthResponse>('/auth/signin', loginRequest);
      const { token, ...user } = response.data;
      
      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast.success('Logged in successfully');
      return user;
    } catch (error) {
      toast.error('Login failed: Invalid credentials');
      return null;
    }
  },

  register: async (registerRequest: RegisterRequest): Promise<boolean> => {
    try {
      await api.post('/auth/signup', registerRequest);
      toast.success('Registration successful. Please login.');
      return true;
    } catch (error) {
      toast.error('Registration failed: Username or email already in use');
      return false;
    }
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  },

  hasRole: (role: string): boolean => {
    const user = AuthService.getCurrentUser();
    if (user && user.roles) {
      return user.roles.includes(role);
    }
    return false;
  },

  isAdmin: (): boolean => {
    return AuthService.hasRole('ROLE_ADMIN');
  }
};

export default AuthService;

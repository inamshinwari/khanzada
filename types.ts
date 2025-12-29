
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export enum BusinessType {
  FRUIT_VEGETABLE = 'FRUIT_VEGETABLE',
  RETAIL_SHOP = 'RETAIL_SHOP',
  GROCERY_STORE = 'GROCERY_STORE',
  RESTAURANT = 'RESTAURANT',
  SERVICE_BUSINESS = 'SERVICE_BUSINESS',
  REAL_ESTATE = 'REAL_ESTATE',
  LOGISTICS = 'LOGISTICS',
  MANUFACTURING = 'MANUFACTURING',
  WHOLESALE = 'WHOLESALE',
  INDUSTRIAL = 'INDUSTRIAL'
}

export interface BusinessConfig {
  name: string;
  type: BusinessType;
  currency: string;
  modules: string[];
}

export interface Transaction {
  id: string;
  date: string;
  type: 'SALE' | 'EXPENSE';
  category: string;
  amount: number;
  description: string;
  quantity?: number;
  unit?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  minStock: number;
  costPrice: number;
  sellingPrice: number;
  expiryDate?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
  joinDate: string;
  attendance: number; // percentage
}

export interface AppState {
  isLoggedIn: boolean;
  userRole: UserRole;
  businessConfig: BusinessConfig | null;
  transactions: Transaction[];
  inventory: InventoryItem[];
  employees: Employee[];
}


import React from 'react';
import { BusinessType } from './types';

export const BUSINESS_MODELS = [
  {
    id: BusinessType.FRUIT_VEGETABLE,
    label: 'Fruit & Vegetable Vendor',
    icon: <i className="fas fa-apple-whole text-red-500"></i>,
    modules: ['Finance', 'Inventory', 'Wastage Tracking'],
    metrics: ['Daily Profit', 'Wastage Rate', 'Top Seller']
  },
  {
    id: BusinessType.RETAIL_SHOP,
    label: 'Small Retail Shop',
    icon: <i className="fas fa-store text-blue-500"></i>,
    modules: ['Finance', 'Inventory', 'Suppliers'],
    metrics: ['Sales Growth', 'Stock Value', 'Profit Margin']
  },
  {
    id: BusinessType.GROCERY_STORE,
    label: 'Grocery / Super Store',
    icon: <i className="fas fa-shopping-basket text-green-500"></i>,
    modules: ['Finance', 'Inventory', 'Employees', 'Barcode'],
    metrics: ['Batch Expiry', 'Daily Footfall', 'Revenue']
  },
  {
    id: BusinessType.RESTAURANT,
    label: 'Restaurant / Cafe',
    icon: <i className="fas fa-utensils text-orange-500"></i>,
    modules: ['Finance', 'Inventory', 'Kitchen', 'Menu Management'],
    metrics: ['Table Turnover', 'Ingredient Cost', 'Order Volume']
  },
  {
    id: BusinessType.SERVICE_BUSINESS,
    label: 'Service Business (Salon, Repair)',
    icon: <i className="fas fa-concierge-bell text-purple-500"></i>,
    modules: ['Finance', 'Appointments', 'Employees'],
    metrics: ['Client Retention', 'Service Efficiency', 'Commission']
  },
  {
    id: BusinessType.REAL_ESTATE,
    label: 'Property / Real Estate',
    icon: <i className="fas fa-building text-indigo-500"></i>,
    modules: ['Finance', 'Tenants', 'Assets'],
    metrics: ['Occupancy Rate', 'Maintenance Cost', 'Net Yield']
  },
  {
    id: BusinessType.LOGISTICS,
    label: 'Transport / Logistics',
    icon: <i className="fas fa-truck text-yellow-600"></i>,
    modules: ['Finance', 'Vehicles', 'Fuel Tracking', 'Employees'],
    metrics: ['Cost per KM', 'Maintenance ROI', 'Fuel Efficiency']
  },
  {
    id: BusinessType.MANUFACTURING,
    label: 'Manufacturing Unit',
    icon: <i className="fas fa-industry text-gray-700"></i>,
    modules: ['Finance', 'Inventory', 'Production', 'Employees'],
    metrics: ['Unit Cost', 'Defect Rate', 'Throughput']
  },
  {
    id: BusinessType.WHOLESALE,
    label: 'Wholesale Distributor',
    icon: <i className="fas fa-boxes-packing text-amber-700"></i>,
    modules: ['Finance', 'Bulk Inventory', 'Invoices', 'Credit Management'],
    metrics: ['Credit Exposure', 'Bulk Turn', 'Margin Analysis']
  },
  {
    id: BusinessType.INDUSTRIAL,
    label: 'Large Industrial Enterprise',
    icon: <i className="fas fa-gears text-slate-800"></i>,
    modules: ['Finance', 'Assets', 'Payroll', 'Compliance'],
    metrics: ['Asset Depreciation', 'Department Efficiency', 'EBITDA']
  },
];

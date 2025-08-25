export interface Product {
  id: number;
  name: string;
  category: string;
  sales: number;
  revenue: number;
}

export interface ApiResponse {
  categories: string[];
  products: Product[];
}

export interface TooltipData {
  product: Product;
  x: number;
  y: number;
  visible: boolean;
}

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};
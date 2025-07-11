
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    categories: ['Eletrônicos', 'Vestuário', 'Alimentação', 'Casa', 'Lazer'],
    products: [
      { id: 1, name: 'Smartphone', category: 'Eletrônicos', sales: 1200, revenue: 144000 },
      { id: 2, name: 'Notebook', category: 'Eletrônicos', sales: 450, revenue: 675000 },
      { id: 3, name: 'Camiseta', category: 'Vestuário', sales: 1800, revenue: 54000 },
      { id: 4, name: 'Calça Jeans', category: 'Vestuário', sales: 950, revenue: 142500 },
      { id: 5, name: 'Arroz', category: 'Alimentação', sales: 3000, revenue: 15000 },
      { id: 6, name: 'Feijão', category: 'Alimentação', sales: 2500, revenue: 17500 },
      { id: 7, name: 'Sofá', category: 'Casa', sales: 120, revenue: 96000 },
      { id: 8, name: 'Mesa', category: 'Casa', sales: 200, revenue: 60000 },
      { id: 9, name: 'Bicicleta', category: 'Lazer', sales: 300, revenue: 450000 },
      { id: 10, name: 'Bola de Futebol', category: 'Lazer', sales: 500, revenue: 10000 },
    ]
  };

  await new Promise(resolve => setTimeout(resolve, 500)); 
  return NextResponse.json(data);
}

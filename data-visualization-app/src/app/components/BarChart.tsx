'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartEvent,
    ActiveElement,
    Chart,
} from 'chart.js';
import { ApiResponse, TooltipData, ChartData, Product } from '../../types/types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        tooltip: {
            enabled: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const BarChart = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);
    const chartRef = useRef<Chart<'bar', number[], string> | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data');
                if (!response.ok) {
                    throw new Error('Falha ao carregar dados');
                }
                const jsonData: ApiResponse = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const filterProducts = useCallback((): Product[] => {
        if (!data) return [];
        if (selectedCategory === 'all') return data.products;
        return data.products.filter(product => product.category === selectedCategory);
    }, [data, selectedCategory]);

    const handleHover = useCallback((event: ChartEvent, elements: ActiveElement[]) => {
        if (elements.length > 0 && data && chartRef.current && event.x !== null && event.y !== null) {
            const index = elements[0].index;
            const filteredProducts = filterProducts();
            const product = filteredProducts[index];

            if (tooltip?.product.id === product.id && tooltip.visible) {
                return;
            }

            const chart = chartRef.current;
            const canvasPosition = chart.canvas.getBoundingClientRect();

            setTooltip({
                product,
                x: event.x - canvasPosition.left,
                y: event.y - canvasPosition.top,
                visible: true
            });
        } else if (tooltip?.visible) {
            setTooltip(null);
        }
    }, [data, filterProducts, tooltip]);


    const prepareChartData = (): ChartData => {
        const filteredProducts = filterProducts();

        return {
            labels: filteredProducts.map(product => product.name),
            datasets: [
                {
                    label: 'Vendas',
                    data: filteredProducts.map(product => product.sales),
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Receita (R$)',
                    data: filteredProducts.map(product => product.revenue),
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ]
        };
    };

    const options = {
        ...chartOptions,
        onHover: handleHover,
    };

    if (loading) return <div>
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    </div>;
    if (error) return <div>Erro: {error}</div>;
    if (!data) return <div>Nenhum dado disponível</div>;

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center" tabIndex={0}>
                Dashboard de Vendas de Produtos
            </h1>

            <div className="mb-6">
                <label htmlFor="category-filter" className="block mb-2 font-medium">
                    Filtrar por Categoria:
                </label>
                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Selecione uma categoria para filtrar os dados">
                    <option value="all">Todas as Categorias</option>
                    {data.categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="relative h-96 w-full">
                <Bar
                    ref={chartRef}
                    data={prepareChartData()}
                    options={options}
                    aria-label="Gráfico de barras mostrando vendas e receita por produto"
                    role="img"/>

                {tooltip?.visible && (
                    <div
                        className="absolute bg-white p-3 border border-gray-300 rounded shadow-lg pointer-events-none z-10"
                        style={{
                            left: `${tooltip.x + 10}px`,
                            top: `${tooltip.y + 10}px`,
                            transform: 'translateX(-50%)',
                            maxWidth: '200px',
                        }}>
                        <h3 className="font-bold">{tooltip.product.name}</h3>
                        <p>Categoria: {tooltip.product.category}</p>
                        <p>Vendas: {tooltip.product.sales}</p>
                        <p>Receita: R$ {tooltip.product.revenue.toLocaleString()}</p>
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>Passe o mouse sobre as barras para ver detalhes.</p>
                <p>Use o menu suspenso para filtrar por categoria.</p>
            </div>
        </div>
    );
};

export default BarChart;
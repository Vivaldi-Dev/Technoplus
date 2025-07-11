import Head from 'next/head';
import BarChart from './components/BarChart';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard de Vendas</title>
        <meta name="description" content="Visualização interativa de dados de vendas" />
      </Head>
      
      <main className="min-h-screen py-8 bg-gray-50">
        <BarChart />
      </main>
    </>
  );
}
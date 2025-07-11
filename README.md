Visualização Interativa de Dados com Filtros e Tooltips

Este projeto fornece um painel interativo de visualização de dados construído com Next.js, TypeScript e Chart.js. Principais características:

- Gráficos de barras dinâmicos com filtros
- Tooltips interativos que exibem informações detalhadas
- Design responsivo para todos os tamanhos de tela
- Arquitetura React moderna com TypeScript

 Funcionalidades

- **Filtragem de dados**: Filtre conjuntos de dados por categoria
- **Tooltips interativos**: Passe o mouse sobre as barras para ver detalhes
- **Design responsivo**: Funciona em desktop e dispositivos móveis
- **Tipagem segura**: Desenvolvido com TypeScript
- **Hooks customizados**: Gerenciamento eficiente de dados e estado

Tecnologias Utilizadas

- **Frontend**: Next.js 15
- **Visualização de dados**: Chart.js 4, react-chartjs-2
- **Estilização**: Tailwind CSS
- **Tipagem**: TypeScript 5
- **API**: Next.js API Routes

Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/interactive-data-viz.git
cd interactive-data-viz
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador

## 💡 Componentes Principais

### `BarChart.tsx`
O componente principal que:
- Busca dados da API
- Renderiza gráficos de barras interativos
- Gerencia filtros e tooltips
- Controla o comportamento responsivo



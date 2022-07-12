import React from 'react';
import './App.css';
import Table from './components/tabela';
import Filtros from './components/Filtros';
import PlanetsProvider from './context/userGlobal';

function App() {
  return (
    <PlanetsProvider>
      <Filtros />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

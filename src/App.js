import React from 'react';
import './App.css';
import Table from './components/tabela';
import PlanetsProvider from './context/userGlobal';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;

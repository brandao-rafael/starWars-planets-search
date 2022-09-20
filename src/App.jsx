import React from 'react';
import PlanetsProvider from './hooks/PlanetsProvider';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

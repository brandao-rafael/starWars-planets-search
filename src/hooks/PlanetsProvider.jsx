import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import planetApi from '../services/planetsApi';

const PlanetsProvider = ({ children }) => {
  const [dataPlanets, setDataPlanets] = useState();
  const [titles, setTitle] = useState();
  const [filterByName, setFilterByName] = useState({
    name: '',
  });
  const [filteredPlanets, setFilteredPlanets] = useState();
  const [columnKeys, setColumnKeys] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filters, setFilters] = useState([]);

  const filterPlanetsByName = ({ target: { value } }) => {
    setFilterByName({ name: value });
    setFilteredPlanets(dataPlanets
      .filter((planets) => planets.name
        .toLowerCase().includes(value.toLowerCase())));
  };

  const filterPlanetsByNumber = ({
    comparison = 'maior que',
    column = 'population',
    value = 0,
  }) => {
    const i = 0;
    filters.forEach((filter) => {
      if (filter.column.includes(column)) column = columnKeys[i];
    });
    if (comparison === 'maior que') {
      setFilteredPlanets(filteredPlanets
        .filter((planets) => Number(planets[column]) > value));
    } else if (comparison === 'menor que') {
      setFilteredPlanets(filteredPlanets
        .filter((planets) => Number(planets[column]) < value));
      console.log(column);
    } else {
      setFilteredPlanets(filteredPlanets
        .filter((planets) => planets[column] === value));
    }
    setColumnKeys(columnKeys.filter((key) => key !== column));
    setFilters([
      ...filters,
      {
        column,
        comparison,
        value,
      }]);
    console.log(filters);
    // criar state com filtro
  };

  useEffect(() => {
    const getData = async () => {
      const dataUnformatted = await planetApi();
      const dataFormatted = dataUnformatted
        .results.map((result) => {
          delete result.residents;
          return result;
        });
      setDataPlanets(dataFormatted);
      const title = await Object.keys(dataFormatted[0]);
      setTitle(title);
      setFilteredPlanets(dataFormatted);
    };
    getData();
  }, []);

  const context = {
    dataPlanets,
    titles,
    filterPlanetsByName,
    filterByName,
    filteredPlanets,
    filterPlanetsByNumber,
    columnKeys,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: Proptypes.node.isRequired,
};

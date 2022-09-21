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
    if (comparison === 'maior que') {
      setFilteredPlanets(dataPlanets
        .filter((planets) => Number(planets[column]) > value));
    } else if (comparison === 'menor que') {
      setFilteredPlanets(dataPlanets
        .filter((planets) => Number(planets[column]) < value));
    } else {
      setFilteredPlanets(dataPlanets
        .filter((planets) => planets[column] === value));
      console.log('equal');
    }
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

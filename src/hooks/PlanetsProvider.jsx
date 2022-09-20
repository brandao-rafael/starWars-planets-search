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

import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';
import Order from './Order';

export default function Filters() {
  const {
    filterByName,
    filterPlanetsByName,
    filterPlanetsByNumber,
    setColumnKeys,
    columnKeys,
    filters,
    setFilters,
    setFilteredPlanets,
    filteredPlanets,
    dataPlanets,
  } = useContext(PlanetsContext);

  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const filterBeforeRemove = ({
    comparison = 'maior que',
    column = 'population',
    value = 0,
  }) => {
    if (comparison === 'maior que') {
      setFilteredPlanets(filteredPlanets
        .filter((planets) => Number(planets[column]) > value));
    } else if (comparison === 'menor que') {
      setFilteredPlanets(filteredPlanets
        .filter((planets) => Number(planets[column]) < value));
    } else if (comparison === 'igual a') {
      setFilteredPlanets(filteredPlanets
        .filter((planets) => planets[column] === value));
    }
    setColumnKeys(columnKeys.filter((key) => key !== column));
  };

  const applyFilters = () => {
    if (filters) {
      return filters.forEach((filter) => {
        filterBeforeRemove(filter);
      });
    }
  };

  const columns = [
    'diameter',
    'population',
    'rotation_period',
    'orbital_period',
    'surface_water',
  ];

  const removeAll = () => {
    setFilters([]);
    setFilteredPlanets(dataPlanets);
    setColumnKeys(columns);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const removeOne = (filterI) => {
    setFilters(filters.filter((filterN) => filterN !== filterI));
    setFilteredPlanets(dataPlanets);
    setColumnKeys([...columnKeys, filterI.column]);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };

  return (
    <>
      <div className="title-search-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Star_Wars_Logo..png" alt="star wars logo" className="title-logo" />
        <input
          className="search-input"
          type="text"
          value={ filterByName.name }
          onChange={ filterPlanetsByName }
          onKeyDown={ filterPlanetsByName }
          data-testid="name-filter"
        />
      </div>
      <form>
        <select
          className="filter-input"
          name="column"
          data-testid="column-filter"
          value={ filterByNumericValues.column }
          onChange={ handleChange }
        >
          {columnKeys.map((key, i) => (
            <option key={ i } value={ key }>{ key }</option>
          ))}
        </select>
        <select
          className="filter-input"
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ filterByNumericValues.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label name="value" htmlFor="numberInput">
          <input
            className="filter-input"
            name="value"
            type="number"
            data-testid="value-filter"
            id="numberInput"
            onChange={ handleChange }
            value={ filterByNumericValues.value }
          />
        </label>
        <button
          className="btn btn-outline-warning"
          type="button"
          data-testid="button-filter"
          onClick={ () => filterPlanetsByNumber(filterByNumericValues) }
        >
          Filtrar
        </button>
      </form>
      <div>
        {filters && filters.map((filterI, i) => (
          <div key={ `${filterI.column}${i}` } className="remove-filter">
            <p className="remove-text" data-testid="filter">
              { `${filterI.column} ${filterI.comparison} ${filterI.value}` }
            </p>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={ () => removeOne(filterI) }
            >
              Remove
            </button>
          </div>
        ))}
        <div>
          <button
            className="btn btn-outline-warning"
            type="button"
            onClick={ removeAll }
            data-testid="button-remove-filters"
          >
            Remover todas as filtragens
          </button>
        </div>
        <Order />
      </div>
    </>
  );
}

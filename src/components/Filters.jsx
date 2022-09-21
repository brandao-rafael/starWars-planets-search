import React, { useContext, useState } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

export default function Filters() {
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };
  const {
    filterByName,
    filterPlanetsByName,
    filterPlanetsByNumber,
  } = useContext(PlanetsContext);
  return (
    <>
      <div>
        <input
          type="text"
          value={ filterByName.name }
          onChange={ filterPlanetsByName }
          onKeyDown={ filterPlanetsByName }
          data-testid="name-filter"
        />
      </div>
      <form>
        <select
          name="column"
          data-testid="column-filter"
          value={ filterByNumericValues.column }
          onChange={ handleChange }
        >
          <option value="population" onClick={ handleChange }>population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
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
            name="value"
            type="number"
            data-testid="value-filter"
            id="numberInput"
            onChange={ handleChange }
            value={ filterByNumericValues.value }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filterPlanetsByNumber(filterByNumericValues) }
        >
          Filtrar
        </button>
      </form>
    </>
  );
}

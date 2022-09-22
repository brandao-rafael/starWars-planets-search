import React, { useState, useContext } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

export default function Order() {
  const columns = [
    'diameter',
    'population',
    'rotation_period',
    'orbital_period',
    'surface_water',
  ];
  const { filteredPlanets, setFilteredPlanets } = useContext(PlanetsContext);
  const [order, setOrder] = useState({});

  const handleSortChange = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const orderResults = () => {
    const { column, sort } = order;
    if (sort === 'ASC') {
      const sorted = Object
        .values(filteredPlanets).sort((a, b) => a[column] - b[column]);
      setFilteredPlanets(sorted);
    } else {
      const sortedDesc = Object
        .values(filteredPlanets).sort((a, b) => b[column] - a[column]);
      setFilteredPlanets(sortedDesc);
    }
  };

  return (
    <div>
      <select name="column" data-testid="column-sort" onChange={ handleSortChange }>
        {columns.map((column, i) => (
          <option key={ i }>{ column }</option>
        ))}
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          name="sort"
          value="ASC"
          id="ASC"
          data-testid="column-sort-input-asc"
          onChange={ handleSortChange }
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          type="radio"
          name="sort"
          value="DESC"
          id="DESC"
          data-testid="column-sort-input-desc"
          onChange={ handleSortChange }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ orderResults }
      >
        Order
      </button>
    </div>
  );
}

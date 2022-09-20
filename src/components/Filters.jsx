import React, { useContext } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

export default function Filters() {
  const { filterByName, filterPlanetsByName } = useContext(PlanetsContext);
  return (
    <div>
      <input
        type="text"
        value={ filterByName.name }
        onChange={ filterPlanetsByName }
        onKeyDown={ filterPlanetsByName }
        data-testid="name-filter"
      />
    </div>
  );
}

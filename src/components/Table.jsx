import React, { useContext } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

const Table = () => {
  const {
    dataPlanets,
    titles,
    filteredPlanets,
  } = useContext(PlanetsContext);

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {titles && titles.map((title, i) => (
              <th key={ i }>{ title }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets ? filteredPlanets.map((planetsF, i) => (
            <tr key={ i }>
              {titles && titles.map((key, idx) => (
                <td
                  data-testid={ idx === 0 ? 'planet-name' : null }
                  key={ `${i}${key}` }
                >
                  {planetsF[key]}
                </td>
              ))}
            </tr>
          )) : (
            dataPlanets && dataPlanets.map((planets, i) => (
              <tr key={ i }>
                {titles && titles.map((key) => (
                  <td key={ `${i}${key}` }>{planets[key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

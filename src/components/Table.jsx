import React, { useContext } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';

const Table = () => {
  const { dataPlanets, titles } = useContext(PlanetsContext);

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
          {dataPlanets && dataPlanets.map((planets, i) => (
            <tr key={ i }>
              {titles && titles.map((key) => (
                <td key={ `${i}${key}` }>{planets[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

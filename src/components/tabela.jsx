import React, { useContext } from 'react';
import { PlanetsContext } from '../context/userGlobal';
import Print from '../Helpers/print';

function Table() {
  const { data } = useContext(PlanetsContext);
  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Edited</th>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item) => (<Print key={ item.name } all={ item } />))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;

import React, { useContext } from 'react';
import { PlanetsContext } from '../context/userGlobal';
import Print from '../Helpers/print';

function Table() {
  const { store, funcoes } = useContext(PlanetsContext);
  const { handleInput } = funcoes;
  const { data, input } = store;

  return (
    <div>
      <label htmlFor="input">
        Pesquise:
        <input
          data-testid="name-filter"
          id="input"
          type="text"
          value={ input[0].filterByName.name }
          onChange={ handleInput }
        />
      </label>
      <table>
        <thead>
          <tr>
            <th data-testid="Imagem">Imagem</th>
            <th data-testid="Edited">Edited</th>
            <th data-testid="Name">Name</th>
            <th data-testid="Rotation">Rotation Period</th>
            <th data-testid="Orbital">Orbital Period</th>
            <th data-testid="Diameter">Diameter</th>
            <th data-testid="Climate">Climate</th>
            <th data-testid="Gravity">Gravity</th>
            <th data-testid="Terrain">Terrain</th>
            <th data-testid="Surface">Surface Water</th>
            <th data-testid="Population">Population</th>
            <th data-testid="Films">Films</th>
            <th data-testid="Created">Created</th>
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

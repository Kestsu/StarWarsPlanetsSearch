import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/userGlobal';

function Filtros() {
  const { funcoes } = useContext(PlanetsContext);
  const { setFiltro } = funcoes;

  const [coluna, setColumn] = useState('population');
  const [comparacao, setComparison] = useState('maior que');
  const [valor, setValor] = useState('0');

  function handleFiltrar() {
    const a = {
      column: coluna,
      comparison: comparacao,
      value: valor,
    };
    // console.log(a);
    setFiltro((oldState) => [...oldState, a]);
  }
  function handleChange({ target }) {
    const { value, name } = target;
    if (name === 'column') {
      setColumn(value);
    }
    if (name === 'comparison') {
      setComparison(value);
    }
    if (name === 'value') {
      setValor(value);
    }
  }

  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
        value={ coluna }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
        value={ comparacao }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <label htmlFor="inputFiltro">
        <input
          id="inputFiltro"
          type="number"
          name="value"
          value={ valor }
          onChange={ handleChange }
          min="0"
          data-testid="value-filter"
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ handleFiltrar }>
        FILTRAR
      </button>
    </form>
  );
}
export default Filtros;

//   const handleChange = ({ target: { value, name } }) => {
//     setFiltro([{
//       ...filtro,
//       filterByNumericValues: [{ ...filtro.filterByNumericValues[0], [name]: value }],
//     }]);
//     console.log(value, name);
//   };

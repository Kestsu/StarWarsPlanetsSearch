import React, { useContext, useState, useEffect } from 'react';
import { PlanetsContext } from '../context/userGlobal';

function Filtros() {
  const { funcoes, store } = useContext(PlanetsContext);
  const { setFiltro, setData } = funcoes;
  const { filterByNumericValues, original } = store;

  const [comparacao, setComparison] = useState('maior que');
  const [valor, setValor] = useState(0);
  const [arrayOption, setArrayOption] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [coluna, setColumn] = useState('population');

  useEffect(() => {
    setColumn(arrayOption[0]);
  }, [arrayOption]);

  function handleRemove() {
    setArrayOption(arrayOption.filter((item) => item !== coluna));
    setValor(0);
  }
  function handleFiltrar() {
    const a = {
      column: coluna,
      comparison: comparacao,
      value: valor,
    };
    setFiltro((oldState) => [...oldState, a]);
    handleRemove();
  }

  async function handleAdd({ target }) {
    setData(original);
    setValor('0');
    await setFiltro(
      filterByNumericValues.filter((item) => item.column !== target.id),
    );
    setArrayOption([...arrayOption, target.id]);
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

  function removeAll() {
    setArrayOption([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setData(original);
    setFiltro([]);
  }

  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
        value={ coluna }
      >
        {arrayOption.map((item) => (
          <option key={ item } value={ item }>
            {item}
          </option>
        ))}
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
      <div>
        {filterByNumericValues.map((item) => (
          <div key={ item.column }>
            <h4 type="text" data-testid="filter">
              {item.column}
              {' '}
              {item.comparison}
              {' '}
              {item.value}
              <button
                id={ item.column }
                type="button"
                onClick={ handleAdd }
                data-testid={ `filter-${item.column}` }
              >
                Delete
              </button>
            </h4>
          </div>
        ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAll }
        >
          Remover todas filtragens
        </button>
      </div>
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

// await setArrayOption([]);
// setArrayOption(arrayOption.forEach((element, index) => {
//   filterByNumericValues.forEach((a, i) => {
//     element[index] !== a[i] ? setArrayOption([...arrayOption, element[index]])
//   });
// }));
// console.log(filterByNumericValues);

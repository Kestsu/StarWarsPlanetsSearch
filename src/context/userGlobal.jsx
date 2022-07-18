import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/planetsAPI';

export const PlanetsContext = createContext({});

function PlanetsProvider({ children }) {
  const [original, setOriginal] = useState([]);
  const [data, setData] = useState([]);
  const [filterByNumericValues, setFiltro] = useState([]);
  const [input, setInput] = useState([
    {
      filterByName: {
        name: '',
      },
    },
  ]);

  useEffect(() => {
    const API = async () => {
      const retorno = await getPlanets();
      const obj = retorno?.filter((item) => delete item.residents);
      setOriginal(obj);
      setData(obj);
      return obj;
    };
    API();
  }, []);

  useEffect(() => {
    const filterName = async () => {
      const obj = original.filter(
        (item) => item.name.includes(input[0].filterByName.name),
      );
      setData(await obj);
      return obj;
    };
    filterName();
  }, [input]);

  useEffect(() => {
    const filtrar = async () => {
      filterByNumericValues.forEach((item) => {
        if (item.comparison === 'maior que') {
          const numero = parseFloat(item.value);
          setData(data.filter((b) => b[item.column] > numero && b[item.column]));
        }
        if (item.comparison === 'menor que') {
          const numero = parseFloat(item.value);
          setData(data.filter((b) => b[item.column] < numero && b[item.column]));
        }
        if (item.comparison === 'igual a') {
          // const numero = parseFloat(quantidade);
          setData(data.filter((b) => b[item.column] === item.value && b[item.column]));
        }
      });
    };
    filtrar();
  }, [filterByNumericValues]);

  function handleInput({ target }) {
    setInput([{
      filterByName: {
        name: target.value,
      },
    }]);
  }

  const store = {
    data,
    input,
    filterByNumericValues,
    original,
  };
  const funcoes = { handleInput, setData, setFiltro };

  const contextValue = { store, funcoes };
  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PlanetsProvider;

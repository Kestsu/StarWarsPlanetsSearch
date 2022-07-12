import React, { createContext, useState, useEffect } from 'react';
import getPlanets from '../services/planetsAPI';

export const PlanetsContext = createContext({});

function PlanetsProvider(props) {
  const [original, setOriginal] = useState([]);
  const [data, setData] = useState([]);
  const [input, setInput] = useState([
    {
      filterByName: {
        name: '',
      },
    },
  ]);
  const [filterByNumericValues, setFiltro] = useState([]);
  // const [filtrado, setFiltrado] = useState([]);

  async function filterName() {
    const obj = original.filter(
      (item) => item.name.includes(input[0].filterByName.name),
    );
    return obj;
  }
  function setarMaior(tipo, quantidade) {
    const numero = parseFloat(quantidade);
    const filt = data.filter((b) => b[tipo] > numero && b[tipo]);
    setData(filt);
  }
  function setarMenor(tipo, quantidade) {
    const numero = parseFloat(quantidade);
    const filt = data.filter((b) => b[tipo] < numero && b[tipo]);
    setData(filt);
  }
  function setarIgual(tipo, quantidade) {
    // const numero = parseFloat(quantidade);
    const filt = data.filter((b) => b[tipo] === quantidade && b[tipo]);
    setData(filt);
  }

  async function filtrar() {
    filterByNumericValues.forEach((item) => {
      // console.log(item.comparison);
      if (item.comparison === 'maior que') {
        setarMaior(item.column, item.value);
      }
      if (item.comparison === 'menor que') {
        setarMenor(item.column, item.value);
        console.log(item.column, item.value);
      }
      if (item.comparison === 'igual a') {
        setarIgual(item.column, item.value);
      }
    });
  }
  async function API() {
    const retorno = await getPlanets();
    const obj = retorno.filter(
      (item) => delete item.residents,
    );
    setOriginal(obj);
    return obj;
  }
  useEffect(() => {
    const a = async () => setData(await API());
    a();
  }, []);

  useEffect(() => {
    const a = async () => setData(await filterName());
    a();
  }, [input]);

  useEffect(() => {
    filtrar();
  }, [filterByNumericValues]);

  function handleInput({ target }) {
    const a = {
      filterByName: {
        name: target.value,
      },
    };
    setInput([a]);
  }

  const store = {
    data,
    input,
  };
  const funcoes = {
    handleInput,
    setData,
    setFiltro,
  };

  const contextValue = {
    store,
    funcoes,
  };
  return (
    <PlanetsContext.Provider value={ contextValue }>
      {props.children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

// if (comparison === 'maior que') {
//   const a = await API();
//   const filt = a.filter((item) => console.log(item.column));
//   setData(filt);
//   console.log('maior');
// }
// if (comparison === 'menor que') {
//   const a = await API();
//   const filt = a.filter((item) => item.column > value);
//   setData(filt);
// }
// if (comparison === 'igual') {
//   const a = await API();
//   const filt = a.filter((item) => item.column === value);
//   setData(filt);
// }

import React, { createContext, useState, useEffect } from 'react';
import getPlanets from '../services/planetsAPI';

export const PlanetsContext = createContext({});

function PlanetsProvider(props) {
  const [data, setData] = useState([{
  }]);
  const [input, setInput] = useState([{
    filterByName: {
      name: '',
    },
  }]);

  async function API() {
    const retorno = await getPlanets();
    const obj = retorno.filter((item) => delete item.residents
    && item.name.includes(input[0].filterByName.name));
    setData(obj);
  }
  useEffect(() => {
    API();
  }, []);

  useEffect(() => {
    API();
  }, [input]);

  function handleInput({ target }) {
    const a = {
      filterByName: {
        name: target.value,
      },
    };
    setInput([a]);
  }

  const store = {
    data, input,
  };
  const funcoes = {
    handleInput, setData,
  };

  const contextValue = {
    store, funcoes,
  };
  return (
    <PlanetsContext.Provider value={ contextValue }>
      { props.children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

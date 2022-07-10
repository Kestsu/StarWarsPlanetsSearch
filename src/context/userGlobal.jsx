import React, { createContext, useState, useEffect } from 'react';
import getPlanets from '../services/planetsAPI';

export const PlanetsContext = createContext({});

function PlanetsProvider(props) {
  const [data, setData] = useState([]);

  const addNew = (a) => {
    setData((oldState) => [...oldState, a]);
  };

  useEffect(() => {
    const API = async () => {
      const retorno = await getPlanets();
      // console.log(retorno);
      // const obj = retorno.filter((item) => delete item.residents);
      setData(retorno);
    };
    API();
  }, []);

  const contextValue = {
    data, addNew,
  };
  return (
    <PlanetsContext.Provider value={ contextValue }>
      { props.children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

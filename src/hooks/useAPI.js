import { useEffect } from 'react';
import getPlanets from '../services/planetsAPI';

const UseAPI = () => {
  useEffect(() => {
    const API = async () => {
      const retorno = await getPlanets();
      const obj = retorno.filter((item) => delete item.residents);
      return obj;
    };
    API();
  }, []);
};

export default UseAPI;

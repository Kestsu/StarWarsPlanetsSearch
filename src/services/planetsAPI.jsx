const getPlanets = async () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const request = await fetch(URL);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getPlanets;

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import testApi from "../services/testApi";

it("Testando os titulos da tabela", () => {
  render(<App />);
  const Imagem = screen.getByTestId("Imagem");
  const Edited = screen.getByTestId("Edited");
  const Name = screen.getByTestId("Name");
  const Rotation_Period = screen.getByTestId("Rotation");
  const Orbital_Period = screen.getByTestId("Orbital");
  const Diameter = screen.getByTestId("Diameter");
  const Climate = screen.getByTestId("Climate");
  const Gravity = screen.getByTestId("Gravity");
  const Terrain = screen.getByTestId("Terrain");
  const Surface_Water = screen.getByTestId("Surface");
  const Population = screen.getByTestId("Population");
  const Films = screen.getByTestId("Films");
  const Created = screen.getByTestId("Created");

  expect(Imagem).toBeInTheDocument();
  expect(Edited).toBeInTheDocument();
  expect(Name).toBeInTheDocument();
  expect(Rotation_Period).toBeInTheDocument();
  expect(Orbital_Period).toBeInTheDocument();
  expect(Diameter).toBeInTheDocument();
  expect(Climate).toBeInTheDocument();
  expect(Gravity).toBeInTheDocument();
  expect(Terrain).toBeInTheDocument();
  expect(Surface_Water).toBeInTheDocument();
  expect(Population).toBeInTheDocument();
  expect(Films).toBeInTheDocument();
  expect(Created).toBeInTheDocument();
});

it.only("Testando o input de filtro", () => {
  jest.fn(global, 'fetch').mockReturnValueOnce({testApi})
  render(<App />);
  const Input = screen.getByTestId("name-filter");
  expect(Input).toBeInTheDocument();

  userEvent.type(Input, 'Tatooine');
  // const Tatooine = screen.queryByRole('cell', {  name: /tatooine/i})
  const tatooine = screen.queryByText(/tatooine/i)
expect(tatooine).toBeInTheDocument();
});

it("Verificando filtros disponiveis", () => {
  render(<App />);
  const filtro = screen.getByTestId("column-filter");
  expect(filtro).toBeInTheDocument();
  expect(filtro.length).toBe(5);
  
  const Compare = screen.getByTestId("comparison-filter");
  expect(Compare).toBeInTheDocument();
  expect(Compare.length).toBe(3);
});

it("Botão para zerar os filtros", () => {
  render(<App />);
  const btn = screen.getByTestId("button-remove-filters");
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveTextContent(/Remover todas filtragens/i);
});

it("Testando as funções", async () => {
  // global.fetch = jest.fn(() => {
  //   return Promise.resolve({
  //     json: () =>
  //       Promise.resolve(testApi),
  //   });
  // });

  //  global.fetch = jest.fn().mockReturnValue({
  //   json: () => Promise.resolve({testApi}),
  //  })
  // render(<App />);

  // const myFetch = async () => {
  //   return {
  //     json: async () => testApi,
  //   };
  // };
// console.log(<App/>);

  // jest.spyOn(global, "fetch")
  // global.fetch.mockResolvedValue({
  //   json: jest.fn().mockResolvedValue({testApi})
  // });

// jest.spyOn(global, 'fetch')
//     .mockImplementation(() => Promise.resolve({
//       status: 200,
//       ok: true,
//       json: () => Promise.resolve(testApi),
//     }))

    // jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve(testApi))

    jest.fn(global, 'fetch').mockReturnValueOnce({testApi})

render(<App />);
const list = await screen.findAllByTestId('list')


expect(list.length).toBe(10)

});

it('testando filtros numericos', async () => {
  render(<App />);
  
  const filtrar = screen.getByRole('button', {  name: /filtrar/i})
  userEvent.click(filtrar)
  
  const filtro = await screen.findAllByTestId("filter")
  expect(filtro.length).toBe(1)
  
  const deletar = screen.getByRole('button', {  name: /delete/i})

  userEvent.click(deletar)

})

it('Testando os botoes',async () => {
  const {debug} = render(<App />);
  
  const numero = screen.getByTestId("value-filter")
  const tipo = screen.getByTestId("column-filter")
  const compare = screen.getByTestId("comparison-filter")
  const filtrar = screen.getByRole('button', {  name: /filtrar/i})
  
  
  userEvent.type(numero, '10000')
  userEvent.selectOptions(tipo, tipo[2].value)
  userEvent.selectOptions(compare, compare[1].value)
  const filtroRemove = screen.getByRole('button', {  name: /remover todas filtragens/i})
  
  userEvent.click(filtrar)
  
  userEvent.type(numero, '10000')
  userEvent.selectOptions(tipo, tipo[0].value)
  userEvent.selectOptions(compare, compare[0].value)
  userEvent.click(filtrar)
  userEvent.click(filtroRemove)
  
  expect(tipo.length).toBe(5)

  debug()
  
})


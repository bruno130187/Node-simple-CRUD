//https://www.youtube.com/watch?v=fm4_EuCsQwg
const express = require('express');
const { randomUUID } = require('crypto');
const fs = require('fs');
const { response } = require('express');
const app = express();
app.use(express.json());

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

/**
 * POST   => Inserir dado
 * GET    => Buscar dado
 * PUT    => Alterar dado
 * DELETE => Remover dado
 */

/**
 * BODY    => Sempre que quiser enviar dados para a aplicação
 * PARAMS  => /products/65465431321654654165
 * QUERY   => /products?id=364165465465465464&value=rere
 */

//Inseri item no array
app.post('/products', (request, response) => {
  //nome e preço => name e price
  const { name, price } = request.body;
  const product = {
    name,
    price,
    id: randomUUID(),
  };
  products.push(product);
  productFile();
  return response.json(product);
});

//Pega todos os produtos
app.get('/products', (request, response) => {
  return response.json(products);
});

//Pega um produto específico
app.get('/products/:id', (request, response) => {
  const { id } = request.params;
  const product = products.find(product => product.id === id);
  return response.json(product);
});

//Alterar um item específico
app.put('/products/:id', (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;
  const productFindindex = products.findIndex(product => product.id === id);
  products[productFindindex] = {
    ...products[productFindindex],
    name,
    price,
  };
  productFile();
  return response.json({
    message: 'Produto alterado com sucesso!',
  });
});

//Remove um produto específico
app.delete('/products/:id', (request, response) => {
  const { id } = request.params;
  const productFindindex = products.findIndex(product => product.id === id);
  products.splice(productFindindex, 1);
  productFile();
  return response.json({
    message: 'Produto removido com sucesso!',
  });
});

function productFile() {
  fs.writeFile('products.json', JSON.stringify(products), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Produto Inserido!');
    }
  });
}

app.listen(4002, () => console.log('Servidor está rodando na porta 4002.'));

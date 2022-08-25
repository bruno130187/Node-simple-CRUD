const http = require('http');
http
  .createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'application/json' });

    if (request.url === '/produto') {
      response.end(
        JSON.stringify({
          data: 'Rota de produto',
        })
      );
    }

    if (request.url === '/usuario') {
      response.end(
        JSON.stringify({
          data: 'Rota de usuário',
        })
      );
    }

    response.end(
      JSON.stringify({
        data: 'Qualquer outra rota',
      })
    );
  })
  .listen(4001, () => console.log('Servidor rodando na porta 4001.'));

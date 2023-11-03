const http = require("http");
const hostname = "127.0.0.1";
const port = "3003";
const getUsers = require("./modules/users");
const { URL } = require("url");

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://127.0.0.1`);
  const params = url.searchParams;
  const name = params.get('hello');


  if (params.has("hello")) {
      if (name !== '') {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.end(`Hello, ${name}`);

      } else {
        response.statusCode = "400";
        response.setHeader("Content-Type", "text/plain");
        response.end("Enter a name");
      }

  } else if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    
  } else if (url.pathname === '/') {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello World\n");

  }
   else {
    response.statusCode = 500;
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);

  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
});

import * as jsonServer from 'json-server';
import * as path from 'path';
import * as fs from 'fs';

const server = jsonServer.create();
const router = jsonServer.router('server.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3333; // Use the port provided by Vercel or default to 3333
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

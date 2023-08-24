import * as jsonServer from 'json-server';
import * as path from 'path';
import * as fs from 'fs';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

const jsonFilePath = path.join(__dirname, 'server.json');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

server.get('/transactions', (req, res) => {
  res.json(jsonData.transactions);
});

server.post('/transactions', (req, res) => {
  const newTransaction = req.body;
  jsonData.transactions.push(newTransaction);

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

  res.status(201).json(newTransaction);
});

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

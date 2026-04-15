import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
// Use path.resolve with process.cwd() for absolute reliability
const router = jsonServer.router(path.resolve(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});


import path from 'path';
import jsonServer from 'json-server';
import { fileURLToPath } from "url";

const server = jsonServer.create();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Path to your db.json - Vercel will bundle this if it's referenced
const router = jsonServer.router(path.resolve(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Optional: Rewriting /api/* to /* so json-server handles it correctly
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));
server.use(router);

export default server;

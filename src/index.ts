import * as http from 'http';
import * as debug from 'debug';

import config from './config';
import db from './config/db';

import Server from './server';
import mongoose from './mongoose';

debug('ts-express:server');

db(config);

const PORT = normalizePort(process.env.PORT || 3000);

const srv = new Server(config);

srv.express.set('port', PORT);

const server = http.createServer(srv.express);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = (typeof PORT === 'string') ? `Pipe ${PORT}` : `Port ${PORT}`;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import mongoose = require('mongoose');

import ApiRouter from './api';

class Server {

  public express: express.Application;
  public api: ApiRouter;

  constructor(config) {
    this.express = express();
    this.globals();
    this.expressConfig();
    this.createApi();
  }

  public createApi(): void {
    this.api = new ApiRouter(this.express);
  }

  public globals(): void {
    global.Promise = require('bluebird').Promise;
  }

  public expressConfig(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(cookieParser('SECRET_GOES_HERE'));
    this.express.use(methodOverride());

    this.express.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });

    this.express.use(errorHandler());
  }
}

export default Server;

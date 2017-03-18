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

  public app: express.Application;
  public api: ApiRouter;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.globals();
    this.expressConfig();
    this.createApi();
  }

  public createApi(): void {
    this.api = new ApiRouter(this.app);
  }

  public globals(): void {
    global.Promise = require('bluebird').Promise;
  }

  public expressConfig(): void {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cookieParser('SECRET_GOES_HERE'));
    this.app.use(methodOverride());

    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });

    this.app.use(errorHandler());
  }
}

export default Server.bootstrap().app;
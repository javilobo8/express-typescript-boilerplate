import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import mongoose = require('mongoose');

import { IUser } from './interfaces/IUser';

import { IModel } from './models/IModel';
import { IUserModel } from './models/IUserModel';

import { userSchema } from './schemas/user';

/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: express.Application;
  public model: IModel;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.model = Object(); //initialize this to an empty object
    this.app = express();
    this.config();
    this.routes();
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    const MONGODB_CONNECTION: string = 'mongodb://localhost:27017/test';

    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cookieParser('SECRET_GOES_HERE'));
    this.app.use(methodOverride());

    global.Promise = require('bluebird').Promise;
    mongoose.Promise = global.Promise;

    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
    this.model.user = connection.model<IUserModel>('User', userSchema);

    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    this.app.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    //use router middleware
    this.app.use(router);
  }

}

export default Server.bootstrap().app;
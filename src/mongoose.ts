import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';

import schemas from './schemas';

import {IUserModel} from './models/IUserModel';

class Models {
  public User: mongoose.Model<IUserModel>;

  constructor() {
    (<any> mongoose).Promise = Promise;
    Object.assign(this, { mongoose }, {
      User: schemas.User
    });
  }

  connect(uri, options = null) {
    if (_.isNil(mongoose)) {
      throw new Error('Specify `mongoose` as the first argument');
    }
    if (_.isNil(uri) || !uri) {
      throw new Error('Missing an `uri` string to establish mongodb connection');
    }
    if (!_.isNil(options) && !_.isPlainObject(options)) {
      throw new Error('The `options` argument must be an object');
    }
    this.mongooseConnect(uri, options);
    return this;
  }

  mongooseConnect(uri: string, options: object = {}) {
    mongoose.connect(uri, options);
    mongoose.connection.once('connected', () => {
      console.log('[models] Mongoose connected');
    });
    mongoose.connection.once('error', (err) => {
      console.log('[models] Mongoose error: ', err);
      throw err;
    });
    mongoose.connection.once('disconnected', () => {
      console.log('[models] Mongoose disconnected');
    });
    process.once('SIGINT', () =>
      mongoose.connection.close(() => {
        console.error('[models] Mongoose disconnected');
        process.exit(0);
      })
    );
  }
}

export default new Models();
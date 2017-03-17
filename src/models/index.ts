import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';

import mongooseConnect from './mongoose-connect';

import schemas from './schemas';

export class Models {
  constructor() {
    (<any> mongoose).Promise = Promise;
    Object.assign(this, { mongoose }, schemas);
  }

  public connect(uri, options = null) {
    if (_.isNil(mongoose)) {
      throw new Error('Specify `mongoose` as the first argument');
    }
    if (_.isNil(uri) || !uri) {
      throw new Error('Missing an `uri` string to establish mongodb connection');
    }
    if (!_.isNil(options) && !_.isPlainObject(options)) {
      throw new Error('The `options` argument must be an object');
    }
    mongooseConnect(mongoose, uri, options);
    return this;
  }
}

export default new Models();

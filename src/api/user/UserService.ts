import * as Promise from 'bluebird';
import {Model} from 'mongoose';
import {IUser} from '../../models/schemas/user';

class UserService {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  public get(): Promise<IUser[]> {
    const query = this.userModel.find({});
    return Promise.resolve(query.exec());
  }

  public getAllUsers(): Promise<object> {
    return Promise.resolve({
      test: 'ok!'
    });
  }
}

export default UserService;

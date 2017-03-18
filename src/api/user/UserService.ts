import * as Promise from 'bluebird';
import {Model} from 'mongoose';
import {IUserModel} from '../../models/IUserModel';

class UserService {
  private userModel: Model<IUserModel>;

  constructor(userModel: Model<IUserModel>) {
    this.userModel = userModel;
  }

  public getAll(): Promise<IUserModel[]> {
    const query = this.userModel.find({});
    return Promise.resolve(query.exec());
  }

  public getById(id: string): Promise<IUserModel>{
    const query = this.userModel.findById(id);
    return Promise.resolve(query.exec());
  }
}

export default UserService;

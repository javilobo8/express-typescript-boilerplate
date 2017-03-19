import * as Promise from 'bluebird';
import {Model} from 'mongoose';
import {IUserModel} from '../../models/IUserModel';
import {IUser} from '../../interfaces/IUser';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

class LoginService {
  private userModel: Model<IUserModel>;

  constructor(userModel: Model<IUserModel>) {
    this.userModel = userModel;
  }

  public login(username: string, password: string = ''): Promise<object> {
    const query = this.userModel.findOne({username});
    return Promise.resolve(query.lean())
      .then((user?: IUserModel) => Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]))
      .spread((user?: IUserModel, correct?: boolean) => {
        if (user && correct) {
          return _.omit(user, ['password']);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public create(user: IUser): Promise<object> {
    return Promise.resolve(bcrypt.hash(user.password, 6))
      .then((password) => _.assign({}, user, {password}))
      .then((_user) => new this.userModel(_user).save())
      .then((_user) => _user.toObject())
      .then((_user) => {
        return _.omit(_user, ['password']);
      });
  }
}

export default LoginService;

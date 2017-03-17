import {Request, Response} from 'express';

import {
  User as UserModel
} from '../../models';

import UserService from './UserService';
import UserController from './UserController';

class UserRouter {
  public userController: UserController;
  public routes: Array<object>;

  constructor(userController: UserController) {
    this.userController = userController;
    this.routes = [{
      method: 'get',
      path: '/',
      handler: this.userController.get,
      bindTo: this.userController
    }, {
      method: 'get',
      path: '/list',
      handler: this.userController.getAllUsers,
      bindTo: this.userController
    }];
  }
}

const userService = new UserService(UserModel);
const userController = new UserController(userService);
const router = new UserRouter(userController);

export default router.routes;

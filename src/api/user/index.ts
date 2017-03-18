import {Request, Response} from 'express';

import UserService from './UserService';
import UserController from './UserController';

import models from '../../mongoose';

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

const userService = new UserService(models.User);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export default userRouter.routes;

import {Request, Response} from 'express';

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
    }];

  }
}

const userService = new UserService;
const userController = new UserController(userService);
const router = new UserRouter(userController);

export default router.routes;
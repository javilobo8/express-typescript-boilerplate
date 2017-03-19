import {Request, Response} from 'express';

import LoginService from './LoginService';
import LoginController from './LoginController';

import models from '../../mongoose';

class UserRouter {
  public loginController: LoginController;
  public routes: Array<object>;

  constructor(loginController: LoginController) {
    this.loginController = loginController;
    this.routes = [{
      method: 'post',
      path: '/',
      handler: this.loginController.login,
      bindTo: this.loginController
    }, {
      method: 'post',
      path: '/create',
      handler: this.loginController.create,
      bindTo: this.loginController
    }];
  }
}

const loginService = new LoginService(models.User);
const loginController = new LoginController(loginService);
const loginRouter = new UserRouter(loginController);

export default loginRouter.routes;

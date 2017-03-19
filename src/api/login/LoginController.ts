import {Request, Response} from 'express';
import * as _ from 'lodash';

import LoginService from './LoginService';

class LoginController {
  public loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  public login(req: Request, res: Response) {
    const {username, password} = req.body;
    this.loginService.login(username, password)
      .then(res.send.bind(res));
  }

  public create(req: Request, res: Response) {
    const user = _.pick(req.body, [
      'username',
      'password',
      'email',
      'firstName',
      'lastName'
    ]);
    this.loginService.create(user)
      .then(res.send.bind(res));
  }
}

export default LoginController;

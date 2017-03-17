import {Request, Response} from 'express';

import UserService from './UserService';

class UserController {
  public userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public get(req: Request, res: Response) {
    Promise.resolve(this.userService.get())
      .then(res.send.bind(res));
  }

  public getAllUsers(req: Request, res: Response) {
    Promise.resolve(this.userService.getAllUsers())
      .then(res.send.bind(res));
  }
}

export default UserController;

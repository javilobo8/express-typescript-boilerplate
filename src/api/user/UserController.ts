import {Request, Response} from 'express';

import UserService from './UserService';

class UserController {
  public userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public get(req: Request, res: Response) {
    Promise.resolve(this.userService.getAll())
      .then(res.send.bind(res));
  }

  public getById(req: Request, res: Response) {
    const {id} = req.params;
    Promise.resolve(this.userService.getById(id))
      .then(res.send.bind(res));
  }
}

export default UserController;

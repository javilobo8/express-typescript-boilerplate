import {Router, Application} from 'express';

import userRoutes from './user';

interface CustomRoute {
  method: string,
  path: string,
  handler(): void,
  bindTo(): void,
  middlewares?: Array<object>
}

class ApiRouter {
  private express: Application;

  constructor(express) {
    this.express = express;
    this.init();
  }

  private init(): void {
    this.express.use('/', this.createRouter(userRoutes));
  }

  private createRouter(routes): Router {
    return routes.reduce((router: Router, route: CustomRoute) => {
      return router[route.method](route.path, [
        ...(route.middlewares || []),
        route.handler.bind(route.bindTo)
        ]);
    }, Router());
  }
}

export default ApiRouter;

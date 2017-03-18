import {Router, Application} from 'express';

import userRoutes from './user';

interface IRoute {
  readonly method: string;
  readonly path: string;
  readonly middlewares?: Array<object>;
  handler();
  bindTo();
}

class ApiRouter {
  private express: Application;

  constructor(express) {
    express.use('/user', this.createRouter(userRoutes));
  }

  private createRouter(routes, auth: boolean = true): Router {
    const defaultMiddlewares = auth ? [] : [];
    return routes.reduce((router: Router, route: IRoute) => {
      return router[route.method](
        route.path,
        [
          ...defaultMiddlewares,
          ...(route.middlewares || []),
          route.handler.bind(route.bindTo)
        ]
      );
    }, Router());
  }
}

export default ApiRouter;

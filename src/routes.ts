import { Router } from 'express';

import UserController from './controller/UserController';
import ProjectController from './controller/ProjectController';
import ServiceController from './controller/ServiceController';

const routes = Router();

routes.get("/users", UserController.find)
routes.post("/user", UserController.create);

routes.get("/services", ServiceController.find)
routes.post("/service", ServiceController.create);
routes.delete("/service/(:id)", ServiceController.delete);

routes.get("/projects", ProjectController.find)
routes.post("/project", ProjectController.create);

export default routes;
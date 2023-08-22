import { Router } from 'express';

import UserController from './controller/UserController';
import ProjectController from './controller/ProjectController';
import ServiceController from './controller/ServiceController';

const routes = Router();

routes.post("/user", UserController.create);
routes.get("/users", UserController.find)
routes.get("/user/:id", UserController.findOne);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);

routes.post("/service", ServiceController.create);
routes.get("/services", ServiceController.find)
routes.delete("/service/:id", ServiceController.delete);

routes.post("/project", ProjectController.create);
routes.get("/projects", ProjectController.find);

export default routes;
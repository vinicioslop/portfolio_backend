import { Router } from 'express';

import UserController from './controller/UserController';
import ProjectController from './controller/ProjectController';

const routes = Router();

routes.get("/users", UserController.find)
routes.post("/user", UserController.create);

routes.get("/projects", ProjectController.find)
routes.post("/project", ProjectController.create);

export default routes;
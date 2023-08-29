import { Router, Request, Response } from 'express';

import UserController from './controller/UserController';
import ProjectController from './controller/ProjectController';
import ServiceController from './controller/ServiceController';

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Connection established"
    });
})

routes.post("/user", UserController.create);
routes.get("/users", UserController.find)
routes.get("/user/:id", UserController.findOne);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);

routes.post("/service", ServiceController.create);
routes.get("/services", ServiceController.findAll);
routes.get("/service/:id", ServiceController.findOne);
routes.put("/service/:id", ServiceController.update);
routes.delete("/service/:id", ServiceController.delete);

routes.post("/project", ProjectController.create);
routes.get("/projects", ProjectController.findAll);
routes.get("/project/:id", ProjectController.findOne);
routes.put("/project/:id", ProjectController.update);
routes.delete("/project/:id", ProjectController.delete);

export default routes;
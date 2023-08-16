import { Request, Response } from "express";

import Project from "../database/schemas/Project";

class ProjectController {
    async find(request: Request, response: Response) {
        try {
            const users = await Project.find();

            return response.json(users);
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened",
                message: error
            })
        }
    }

    async create(request: Request, response: Response) {
        const { name, description } = request.body;

        try {
            const projectExists = await Project.findOne({ description: description });

            if (projectExists) {
                return response.status(400).json({
                    error: "Ooops",
                    message: "Project already exists"
                });
            }

            const project = await Project.create({
                name,
                description
            });

            return response.json(project);
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }
}

export default new ProjectController();
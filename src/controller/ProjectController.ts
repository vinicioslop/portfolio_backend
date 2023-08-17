import { Request, Response } from "express";

import Project from "../database/schemas/Project";

class ProjectController {
    async find(request: Request, response: Response) {
        try {
            const projects = await Project.find();

            return response.json(projects);
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened",
                message: error
            })
        }
    }

    async create(request: Request, response: Response) {
        const {
            name,
            description,
            technologies,
            githubUrl,
            liveUrl,
            imageUrl,
            imageAlt
        } = request.body;

        try {
            const projectExists = await Project.findOne({ name: name });

            if (projectExists) {
                return response.status(400).json({
                    error: "Ooops",
                    message: "Project already exists"
                });
            }

            const project = await Project.create({
                name,
                description,
                technologies,
                githubUrl,
                liveUrl,
                imageUrl,
                imageAlt
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
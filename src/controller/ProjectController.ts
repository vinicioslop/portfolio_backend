import { Request, Response } from "express";

import Project from "../database/schemas/Project";

class ProjectController {
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

    async findOne(request: Request, response: Response) {
        try {
            const project = await Project.findById(request.params.id);

            if (project) {
                response.json(project);
            } else {
                response.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const updatedProject = await Project.findByIdAndUpdate(request.params.id, request.body, {
                new: true,
            });
            if (updatedProject) {
                response.json(updatedProject);
            } else {
                response.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const deletedProject = await Project.findByIdAndDelete(request.params.id);
            if (deletedProject) {
                response.json(deletedProject);
            } else {
                response.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happened' });
        }
    }
}

export default new ProjectController();
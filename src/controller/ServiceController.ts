import { Request, Response } from "express";

import Service from "../database/schemas/Service";

class ServiceController {
    async create(request: Request, response: Response) {
        const { name, description, imageUrl, imageAlt } = request.body;

        try {
            const serviceExists = await Service.findOne({ description: description });

            if (serviceExists) {
                return response.status(400).json({
                    error: "Ooops",
                    message: "Service already exists"
                });
            }

            const service = await Service.create({
                name,
                description,
                imageUrl,
                imageAlt
            });

            return response.json(service);
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const users = await Service.find();

            return response.json(users);
        } catch (error) {
            return response.status(500).json({
                error: "Something wrong happened",
                message: error
            })
        }
    }

    async findOne(request: Request, response: Response) {
        try {
            const service = await Service.findById(request.params.id);

            if (service) {
                response.json(service);
            } else {
                response.status(404).json({ error: 'Service not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const updatedService = await Service.findByIdAndUpdate(request.params.id, request.body, {
                new: true,
            });
            if (updatedService) {
                response.json(updatedService);
            } else {
                response.status(404).json({ error: 'Service not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const deletedService = await Service.findByIdAndDelete(request.params.id);
            if (deletedService) {
                response.json(deletedService);
            } else {
                response.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happened' });
        }
    }
}

export default new ServiceController();
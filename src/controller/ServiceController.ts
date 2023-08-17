import { Request, Response } from "express";

import Service from "../database/schemas/Service";

class ServiceController {
    async find(request: Request, response: Response) {
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

    async update(request: Request, response: Response) {
        
    }

    async delete(request: Request, response: Response) {

    }
}

export default new ServiceController();
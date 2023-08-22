import { Request, Response } from "express";

import User from "../database/schemas/User";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        try {
            const userExists = await User.findOne({ email: email });

            if (userExists) {
                return response.status(400).json({
                    error: "Ooops",
                    message: "User already exists"
                });
            }

            const user = await User.create({
                name,
                email,
                password
            });

            return response.json(user);
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    async find(request: Request, response: Response) {
        try {
            const users = await User.find();

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
            const item = await User.findById(request.params.id);

            if (item) {
                response.json(item);
            } else {
                response.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const updatedItem = await User.findByIdAndUpdate(request.params.id, request.body, {
                new: true,
            });
            if (updatedItem) {
                response.json(updatedItem);
            } else {
                response.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const deletedItem = await User.findByIdAndDelete(request.params.id);
            if (deletedItem) {
                response.json(deletedItem);
            } else {
                response.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happened' });
        }
    }
}

export default new UserController();
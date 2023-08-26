import { Request, Response } from "express";

import User from "../database/schemas/User";

class UserController {
    async create(request: Request, response: Response) {
        const { name, password } = request.body;

        try {
            const userExists = await User.findOne({ name: name });

            if (userExists) {
                return response.status(400).json({
                    error: "Ooops",
                    message: "Name already used. Please choose another one."
                });
            }

            let user = await User.create({
                name,
                password
            });

            user.password = 'encrypted';

            return response.json((user));
        } catch (error) {
            return response.status(500).json({
                error: "Registration failed",
                message: error
            })
        }
    }

    async find(request: Request, response: Response) {
        try {
            const users = await User.find({}, '-password');

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
            const user = await User.findById(request.params.id, '-password');

            if (user) {
                response.json(user);
            } else {
                response.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                request.params.id,
                request.body,
                {
                    new: true,
                });
            if (updatedUser) {
                updatedUser.password = 'encrypted';
                response.json(updatedUser);
            } else {
                response.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happens' });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const deletedUser = await User.findByIdAndDelete(request.params.id);
            if (deletedUser) {
                deletedUser.password = 'encrypted';

                response.json(deletedUser);
            } else {
                response.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            response.status(500).json({ error: 'Something wrong happened' });
        }
    }
}

export default new UserController();
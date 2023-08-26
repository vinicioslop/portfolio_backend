import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../database/schemas/User";

const SECRET_KEY = 'chavesupersecreta';

class AuthController {
    async login(request: Request, response: Response) {
        const { name, password } = request.body;

        const user = await User.findOne({ name: name });

        if (!user) {
            return response.status(401).json({
                message: 'Credenciais inválidas'
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userName: user.name }, SECRET_KEY);

            response.json({
                message: 'User connected',
                token: token
            });
        }

        return response.status(401).json({
            message: 'Credenciais inválidas'
        });
    }
}

export default new AuthController();
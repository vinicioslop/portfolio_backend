import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../database/schemas/User";

class AuthController {
    async login(request: Request, response: Response) {
        if (request.token) {
            response.json({
                message: 'User connected',
                token: request.token
            });
        }

        return response.status(401).json({
            message: 'Credenciais inválidas'
        });
    }

    async generateToken(request: Request, response: Response, next: NextFunction) {
        const { name, password } = request.body;

        const user = await User.findOne({ name: name });

        if (!user) {
            return response.status(401).json({
                message: 'User does not exist'
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const length: number = 128;
            let randomSequence: string = "";

            for (let i: number = 0; i < length; i++) {
                randomSequence += Math.floor(Math.random() * length);
            }

            const hash = await bcrypt.hash(randomSequence, 12);

            request.token = hash;
            next();
        }
    }
}

export default new AuthController();
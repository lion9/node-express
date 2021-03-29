import { NextFunction, Request, Response } from 'express';
import UserService from '@services/users.service';
import UserRepository from '@data-access/user.repository';

const userService = new UserService(UserRepository);

export default class UserController {
    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userDTO = req.body;
        try {
            const accessToken = await userService.login(userDTO);
            res.setHeader('authorisation', `Bearer ${accessToken}`);
            res.send('Logged in');
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }
}

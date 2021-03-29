import { NextFunction, Request, Response } from 'express';
import { User } from '@mytypes/user';
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

    static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const search: any = req.query.search;
        const limit: any = req.query.limit;
        const orderBy: string = 'login';
        const sortDir: string = 'ASC';

        if (search && limit) {
            try {
                const users: User = await userService.getAutoSuggestUsers(search, limit, orderBy, sortDir);
                res.json(users);
            } catch (e) {
                // eslint-disable-next-line callback-return
                next(e);
            }
        } else {
            try {
                const users: User[] = await userService.getAllUsers();
                res.json(users);
            } catch (e) {
                // eslint-disable-next-line callback-return
                next(e);
            }
        }
    }

    static async getUserByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userID = req.params.id;
        try {
            const user: User | undefined = await userService.getUserByID(userID);
            res.json(user);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }

    static async insertNewUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userDTO = req.body;
        try {
            await userService.insertNewUser(userDTO);
            res.send('User added');
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }

    static async addUserToGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userIds = req.body.userIds;
        const groupId: string = req.params.id;
        try {
            await userService.addUserToGroup(groupId, userIds);
            res.send('User added');
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }

    static async updateExistingUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userDTO = req.body;
        const id: string = req.params.id;
        try {
            await userService.updateExistingUser(userDTO, id);
            res.send(`User ${id} updated`);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }

    static async deleteUserByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: string = req.params.id;
        try {
            await userService.deleteUserByID(id);
            res.send(`User ${id} deleted`);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }
}

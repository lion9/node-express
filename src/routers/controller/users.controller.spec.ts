import UserService from '@services/users.service';
import UserController from '@routers/controller/users.controller';
import { NextFunction, Request, Response } from 'express';
import UserRepository from '@data-access/user.repository';

jest.mock('@services/users.service');

let userService: UserService;
const fakeToken = 's$sdfDgf45d';

beforeAll(() => {
    userService = new UserService(UserRepository);
    // userService.login = jest.fn().mockResolvedValue('s$sdfDgf45d').mockRejectedValue('error');
});


describe('UserController: ', () => {
    const mockReq = {
        body: {
            login: 'Artyom',
            password: 'qwerty123'
        }
    };
    const mockRes = {
        setHeader: jest.fn(),
        send: jest.fn()
    };
    const nextFunction = jest.fn();

    test('the  class constructor should have been called', () => {
        expect(UserService).toHaveBeenCalled();
    });

    test('should send auth token in case of success scenario', async () => {
        // @ts-ignore
        userService.login.mockResolvedValue('s$sdfDgf45d').mockRejectedValue('error');
        // jest.spyOn(userService, 'login').mockResolvedValue('s$sdfDgf45d' as any).mockRejectedValue('error');
        await UserController.login(mockReq as Request, mockRes as any as Response, nextFunction as NextFunction);
        expect(mockRes.setHeader.mock.calls[0]).toEqual(['authorisation', `Bearer ${fakeToken}`]);
        expect(mockRes.send.mock.calls[0][0]).toEqual('Logged in');
    });

    test('should throw an error', async () => {
        return expect((userService.login as jest.Mock)()).rejects.toMatch('error');
    });
});

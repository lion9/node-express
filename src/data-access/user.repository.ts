import Users from '../models/user.model';
import { Identifier, Op } from 'sequelize';
import sequelize from '../config/sequelize';
import config from '../config';
import jwt from 'jsonwebtoken';

export default class UserRepository {
    static async login(userDTO: any) {
        try {
            const user = await Users.findAll({
                where: {
                    [Op.and]: [
                        { login: userDTO.login },
                        { password: userDTO.password }
                    ]
                }
            });
            if (user) {
                const login = user[0].getDataValue('login');
                const password = user[0].getDataValue('password');
                // Generate an access token
                return jwt.sign({ login, password }, config.accessTokenSecret, { expiresIn: '5m' });
            }
        } catch (e) {
            throw e;
        }
    }

    static async getById(id: string) {
        try {
            const user = await Users.findAll({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            });
            if (user.length) {
                return user;
            }
            throw new Error(`No user with id ${id}`);
        } catch (e) {
            throw e;
        }
    }

    static async getAll() {
        try {
            const users = await Users.findAll();
            return users;
        } catch (e) {
            throw e;
        }
    }

    static async insertUser(login: string, password: string, age: number) {
        try {
            await Users.create({
                login,
                password,
                age
            });
        } catch (e) {
            throw e;
        }
    }

    static async updateUser(id: string, login: string, password: string, age: number) {
        try {
            const affectedRows = await Users.update({
                login,
                password,
                age
            }, {
                where: {
                    id
                }
            });
            if (affectedRows[0] === 0) {
                throw new Error(`No user with id ${id}`);
            }
        } catch (e) {
            throw e;
        }
    }

    static async deleteUser(id: string) {
        try {
            const destroyedRows = await Users.destroy({
                where: {
                    id
                }
            });
            if (!destroyedRows) {
                throw new Error(`No user with id ${id}`);
            }
        } catch (e) {
            throw e;
        }
    }

    static async autoSuggestUsers(search: string, limit: number, orderBy: string, sortDir: string) {
        try {
            const limitedUsers = await Users.findAll({
                where: {
                    login: {
                        [Op.iLike]: `${(search as String)}%`
                    }
                },
                limit: Number(limit),
                order: [[orderBy, sortDir]]
            });
            return limitedUsers;
        } catch (e) {
            throw e;
        }
    }

    static async insertUserToGroup(groupId: string, userIds: Array<String>): Promise<void> {
        await sequelize.transaction(async (t) => {
            const userPromises = userIds.map(async (userId) => {
                return new Promise(async (resolve, reject) => {
                    const user = await Users.findByPk(userId as Identifier, { transaction: t });
                    if (!user) {
                        reject(userId);
                    } else {
                        resolve(user);
                    }
                });
            });
            const users = await Promise.all(userPromises).catch((userId) => {
                throw new Error(`No such user ${userId}`);
            });
            // @ts-ignore
            const setGroupPromises = users.map(async (user) => {
                return new Promise<void>(async (resolve, reject) => {
                    try {
                        // @ts-ignore
                        const group = await user.setGroups(groupId, { transaction: t });
                        resolve(group);
                    } catch (e) {
                        reject(groupId);
                    }
                });
            });
            return await Promise.all(setGroupPromises).catch((group) => {
                throw new Error(`No such user ${group}`);
            });
        });
    }
}

import Groups from '../models/group.model';
import { Op } from 'sequelize';
import { Permission } from '../types/permission';

export default class GroupRepository {
    static async getById(id: string) {
        try {
            const group = await Groups.findAll({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            });
            if (group.length) {
                return group;
            }
            throw new Error(`No group with id ${id}`);
        } catch (e) {
            throw e;
        }
    }
    static async getAll() {
        try {
            const groups = await Groups.findAll();
            return groups;
        } catch (e) {
            throw e;
        }
    }
    static async insertGroup(name: string, permissions: Array<Permission>) {
        try {
            await Groups.create({
                name,
                permissions
            });
        } catch (e) {
            throw e;
        }
    }
    static async updateGroup(id: string, name: string, permissions: Array<Permission>) {
        try {
            const affectedRows = await Groups.update({
                name,
                permissions
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
    static async deleteGroup(id: string) {
        try {
            const destroyeRows = await Groups.destroy({
                where: {
                    id
                }
            });
            if (!destroyeRows) {
                throw new Error(`No group with id ${id}`);
            }
        } catch (e) {
            throw e;
        }
    }
}

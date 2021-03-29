import { NextFunction, Request, Response } from 'express';
import { Group } from '../../types/group';
import GroupService from '../../services/groups.service';
import GroupRepository from '../../data-access/group.repository';

const groupService = new GroupService(GroupRepository);

export default class GroupController {
    static async getAllGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const groups: Group[] = await groupService.getAllGroups();
            res.json(groups);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }


    static async getGroupByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        const groupIDO = req.params.id;
        try {
            const group: Group = await groupService.getGroupByID(groupIDO);
            res.json(group);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }

    static async insertNewGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const groupIDO = req.body;
        try {
            await groupService.insertNewGroup(groupIDO);
            res.send('Group added');
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }

    static async updateExistingGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const groupIDO = req.body;
        const id: string = req.params.id;
        try {
            await groupService.updateExistingGroup(groupIDO, id);
            res.send(`Group ${id} updated`);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }

    static async deleteGroupByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: string = req.params.id;
        try {
            await groupService.deleteGroupByID(id);
            res.send(`Group ${id} deleted`);
        } catch (e) {
            // eslint-disable-next-line callback-return
            next(e);
        }
    }
}

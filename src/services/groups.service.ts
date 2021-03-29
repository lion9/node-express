import { Group } from '../types/group';
import { async_timer } from 'execution-time-decorators';

export default class GroupService {
    GroupRepository: any;
    constructor(GroupRepository: any) {
        this.GroupRepository = GroupRepository;
    }
    /**
     * Function to get a group from the table by their id
     * @param {id: string} id of the group to be fetched
     * @returns {Promise<Group>}
     */
    @async_timer
    async getGroupByID(id: string): Promise<Group> {
        try {
            const group = await this.GroupRepository.getById(id);
            if (!group.length) {
                throw new Error(`There are no groups with id ${id}`);
            }
            return group;
        } catch (e) {
            throw e;
        }
    }
    /**
     * Function to select all groups from the table
     * @returns {Promise<Group[]>}
     */
    @async_timer
    async getAllGroups(): Promise<Group[]> {
        try {
            const groups = await this.GroupRepository.getAll();
            return groups;
        } catch (e) {
            throw e;
        }
    }
    /**
     * Function to insert a new group
     * @param {groupDTO: any} data transer object
     * @returns {Promise<Group>}
     */
    @async_timer
    async insertNewGroup(groupDTO: any): Promise<Group> {
        const { name, permissions } = groupDTO;
        try {
            const group = await this.GroupRepository.insertGroup(name, permissions);
            return group;
        } catch (e) {
            throw e;
        }
    }
    /**
     * Function to update existin group
     * @param {groupDTO: any} data transer object
     * @param {id: string}
     * @return {Promise<void>}
     */
    @async_timer
    async updateExistingGroup(groupDTO: any, id: string): Promise<void> {
        const { name, permissions } = groupDTO;
        try {
            await this.GroupRepository.updateGroup(id, name, permissions);
        } catch (e) {
            throw e;
        }
    }
    /**
     * Function to delete a group by id
     * @param {id: string}
     * @return {Promise<void>}
     */
    @async_timer
    async deleteGroupByID(id: string): Promise<void> {
        try {
            await this.GroupRepository.deleteGroup(id);
        } catch (e) {
            throw e;
        }
    }
}

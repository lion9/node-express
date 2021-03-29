import { User } from '../types/user';
import { async_timer } from 'execution-time-decorators';

export default class UserService {
    UserRepository: any;
    constructor(UserRepository: any) {
        this.UserRepository = UserRepository;
    }
    @async_timer
    async login(userDTO: any): Promise<User | undefined> {
        return await this.UserRepository.login(userDTO);
    }
    /**
     * Function to get a user from the table by their id
     * @param {id: string} id of the user to be fetched
     * @returns {user}
     */
    @async_timer
    async getUserByID(id: string): Promise<User | undefined> {
        return await this.UserRepository.getById(id);
    }
    /**
     * Function to select all users from the table
     * @returns {users: User[]}
     */
    @async_timer
    async getAllUsers(): Promise<User[]> {
        return await this.UserRepository.getAll();
    }
    /**
     * Function to insert a new user
     * @param {userDTO: any} userDTO - data transer object
     * @returns {user: User}
     */
    @async_timer
    async insertNewUser(userDTO: any): Promise<User> {
        const { login, password, age } = userDTO;
        return await this.UserRepository.insertUser(login, password, age);
    }
    /**
     * Function to update existing user
     * @param {userDTO: any} userDTO -data transer object
     * @param {id: string} id of the user
     */
    @async_timer
    async updateExistingUser(userDTO: any, id: string): Promise<void> {
        const { login, password, age } = userDTO;
        return await this.UserRepository.updateUser(id, login, password, age);
    }
    /**
     * Function to delete a user by id
     * @param {id: string} id of the user
     * @returns {Promise<void>}
     */
    @async_timer
    async deleteUserByID(id: string): Promise<void> {
        return await this.UserRepository.deleteUser(id);
    }
    /**
     * Function to get autosuggested users whose
     * number is limited by the \'limit\' param
     * @param {search: string} search
     * @param {limit: number} limit
     * @param {orderBy: string} orderBy
     * @param {sortDir: string} sortDir
     * @returns {limitedUsers: Promise<User>}
     */
    @async_timer
    async getAutoSuggestUsers(search: string, limit: number, orderBy: string, sortDir: string): Promise<User> {
        return await this.UserRepository.autoSuggestUsers(search, limit, orderBy, sortDir);
    }
    /**
     * Function to add an array of user to a group
     * @param {groupId: string} groupId
     * @param {userIds: Array<String>} userIds
     * @returns {Promise<User>}
     */
    @async_timer
    async addUserToGroup(groupId: string, userIds: Array<String>): Promise<User> {
        return await this.UserRepository.insertUserToGroup(groupId, userIds);
    }
}

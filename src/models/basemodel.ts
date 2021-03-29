import { Model } from 'sequelize';

class BaseModel extends Model {
    /**
     * Function to initialize  table and fill it with groups
     * @static
     * @param {data} array of groups
     */
    static async initialize(data: any): Promise<void> {
        await this.prepopulateEntitties(data);
        const groups = await this.findAll();
        process.stdout.write(JSON.stringify(groups, null, 2));
    }
    /**
     * Function to create array of promises and pass it in Promise.all
     * @param {groups} array of groups
     * @returns {Promise} promise of group promises
     */
    static async prepopulateEntitties(entitites: any[]): Promise<any> {
        const groupPromises = entitites.map(entity => {
            return this.create(entity);
        });
        return Promise.all(groupPromises);
    }
}

export default BaseModel;

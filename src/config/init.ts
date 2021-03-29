import sequelize from './sequelize';
import Users from '../models/user.model';
import { predifinedUsers } from '../seeds/users/seeds.data';
import Groups from '../models/group.model';
import { predifinedGroups } from '../seeds/groups/seed.data';

export default async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true });
        await sequelize.query('DROP TABLE IF EXISTS "UserGroup"');
        await Users.initialize(predifinedUsers);
        await Groups.initialize(predifinedGroups);
        await Users.belongsToMany(Groups, {
            through: 'UserGroup'
        });
        await Groups.belongsToMany(Users, {
            through: 'UserGroup'
        });
        await sequelize.sync();
    } catch (e) {
        throw e;
    }
};

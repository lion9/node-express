import { Sequelize } from 'sequelize';
import config from '.';

export default new Sequelize(config.database as string, config.user as string, config.password as string, {
    host: config.host,
    dialect: 'postgres',
    dialectOptions: {
        'ssl': {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

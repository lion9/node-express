import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import BaseModel from './basemodel';

class Users extends BaseModel {
    static async initialize(data: any) {
        return super.initialize(data);
    }
}

Users.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Users',
    freezeTableName: true
});

export default Users;

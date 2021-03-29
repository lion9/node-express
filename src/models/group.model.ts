import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import BaseModel from './basemodel';

class Groups extends BaseModel {
    static async initialize(data: any) {
        return super.initialize(data);
    }
}

Groups.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Groups',
    freezeTableName: true
});

export default Groups;

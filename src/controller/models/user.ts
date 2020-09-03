import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../database/sequelize";

export class User extends Model {
    public firstName: string;
    public password: string;
}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
            tableName: "users",
            sequelize: database,
    }
)

User.sync({ force : false });
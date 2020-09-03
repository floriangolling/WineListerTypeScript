import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../database/sequelize";

//Define the User class, from Model
export class User extends Model {
    public firstName: string;
    public password: string;
}

//init the class
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

//Sync the class, if one true, drop the table if exist, if false, it doesnt.
User.sync({ force : false });
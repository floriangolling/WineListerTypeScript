import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../database/sequelize";

//Define the Stage class, from Model
export class Stage extends Model {
    public Week: string;
    public Description: string;
    public username: string;
}

//init the class
Stage.init(
    {
        Week: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
            tableName: "stages",
            sequelize: database,
    }
)

//Sync the class, if one true, drop the table if exist, if false, it doesnt.
Stage.sync({ force : false });
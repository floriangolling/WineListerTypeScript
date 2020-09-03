import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../database/sequelize";

export class Stage extends Model {
    public Week: string;
    public Description: string;
    public username: string;
}

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

Stage.sync({ force : false });
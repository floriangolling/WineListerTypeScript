import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../database/sequelize";

//Define the Vine class, from Model
export class Vine extends Model {
    public Name: string;
    public Description: string;
    public Quantity: number;
    public username: string;
}

//init the class
Vine.init(
    {
        Name: {
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
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
            tableName: "vines",
            sequelize: database,
    }
)

//Sync the class, if one true, drop the table if exist, if false, it doesnt.
Vine.sync({ force : false });
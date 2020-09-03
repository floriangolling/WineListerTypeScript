import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../../database/sequelize";

export class Vine extends Model {
    public Name: string;
    public Description: string;
    public Quantity: number;
    public username: string;
}

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

Vine.sync({ force : false });
import { Sequelize } from "sequelize"

//Create the postgresql with sequelize, using password, name, and host
export const database = new Sequelize("postgres://smwtvuyw:yq9QMmFpJQzzhEgEp7rtslRouQsQyGFv@kandula.db.elephantsql.com:5432/smwtvuyw");
import db from "../db";
import Sequelize from "sequelize";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface UserSongsAttributes
  extends Model<
    InferAttributes<UserSongsAttributes>,
    InferCreationAttributes<UserSongsAttributes>
  > {
  id: CreationOptional<number>;
}

const UserSongs = db.define<UserSongsAttributes>("usersongs", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

export default UserSongs;

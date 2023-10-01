import db from "../db";
import Sequelize from "sequelize";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

const { STRING, INTEGER, ENUM, UUID, UUIDV4 } = Sequelize;

export interface UserSongsAttributes
  extends Model<
    InferAttributes<UserSongsAttributes>,
    InferCreationAttributes<UserSongsAttributes>
  > {
  id: string;
  songId: string;
  userId: string;
}

const UserSongs = db.define<UserSongsAttributes>("usersongs", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  songId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
});

export default UserSongs;

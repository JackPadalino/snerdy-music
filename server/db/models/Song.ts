import db from "../db";
import Sequelize from "sequelize";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

const { STRING, INTEGER, ENUM, UUID, UUIDV4 } = Sequelize;

export interface SongModelAttributes
  extends Model<
    InferAttributes<SongModelAttributes>,
    InferCreationAttributes<SongModelAttributes>
  > {
  id: CreationOptional<number>;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  filepath: string;
}

const Song = db.define<SongModelAttributes>("song", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  artist: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bpm: {
    type: INTEGER,
    allowNull: false,
  },
  key: {
    type: ENUM,
    values: [
      "1A",
      "1B",
      "2A",
      "2B",
      "3A",
      "3B",
      "4A",
      "4B",
      "5A",
      "5B",
      "6A",
      "6B",
      "7A",
      "7B",
      "8A",
      "8B",
      "9A",
      "9B",
      "10A",
      "10B",
      "11A",
      "11B",
      "12A",
      "12B",
    ],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: false,
  },
  filepath: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
});

export default Song;

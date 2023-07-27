import db from "./db";
import Song from "./models/Song";
import User from "./models/User";
import UserSongs from "./models/UserSongs";

Song.belongsToMany(User, { through: UserSongs });
User.belongsToMany(Song, { through: UserSongs });

export { db, User, Song, UserSongs };

import songType from "./songType";

export default interface userType {
  id?: string;
  username: string;
  songs: songType[];
}

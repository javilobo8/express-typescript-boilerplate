import {Document, model, Model, Schema} from 'mongoose';

const UserSchema = new Schema({
  name: String,
  surname: String,
}, { versionKey: false });

export interface IUser extends Document {
  username: string;
  age: number;
  friends: string[];
  data: any[];
}

const User = model<IUser>('User', UserSchema);

export default User;


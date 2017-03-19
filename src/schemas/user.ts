import * as mongoose from 'mongoose';
import {IUserModel} from '../models/IUserModel';

const UserSchema: mongoose.Schema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  createdAt: Date
}, {
  versionKey: false
});

UserSchema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const modelName = 'User';

export default mongoose.model<IUserModel>(modelName, UserSchema);
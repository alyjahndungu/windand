const UserModel = require("../models/users");

export const registerUser = (data) =>
  new UserModel(data).save().then((user) => user.toObject());

export const getUserByEmail = (email) => UserModel.findOne({ email });

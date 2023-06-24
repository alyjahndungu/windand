const UserModel = require("../models/users");

export const getUserByEmail = (email) => UserModel.findOne({ email });

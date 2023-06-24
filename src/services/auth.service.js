const UsersModel = require("../models/users");

export const registerUser = (data) =>
  new UsersModel(data).save().then((user) => user.toObject());

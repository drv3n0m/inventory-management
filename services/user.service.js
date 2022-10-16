const User = require("../models/User");

exports.signupService = async (userInfo) => {
  return await User.create(userInfo);
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email });
};

exports.findUserByToken = async (token) => {
  return User.findOne({ confirmationToken: token });
};

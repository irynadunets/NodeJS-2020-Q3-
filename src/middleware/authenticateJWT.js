const jwt = require('jsonwebtoken');
const config = require('../common/config');
const createError = require('http-errors');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    throw createError(401, 'Access Denied');
  }
  try {
    const verified = jwt.verify(
      token.replace(config.Authorization_Schema, '').replace(' ', ''),
      config.JWT_SECRET_KEY
    );
    req.user = verified;
  } catch (error) {
    throw createError(400, `Invalid Token!!! ${error}`);
  }
  next();
};

module.exports = authenticateJWT;

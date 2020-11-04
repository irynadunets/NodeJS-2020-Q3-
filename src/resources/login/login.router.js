const router = require('express').Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const config = require('../../common/config');
const loginServices = require('../login/login.service');

router.route('/').post(async (req, res, next) => {
    const user = await loginServices.authenticateUser(req.body.login);
    if (!user) {
      throw createError(403, `User '${JSON.stringify(req.body)}' Forbidden `);
    }
    user.comparePassword(req.body.password, (error, match) => {
      if (!match) {
        return res.status(403).send({ message: 'Forbidden' });
      }
    });
    const _token = jwt.sign(
      { login: user.login, userId: user._id },
      config.JWT_SECRET_KEY
    );
    return res
      .header(config.HTTP_HEADER_Authorization, _token)
      .send({ token: _token });
});

module.exports = router;
